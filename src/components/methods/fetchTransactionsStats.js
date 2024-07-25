import { ref, onMounted } from 'vue'
import axios from 'axios'

const today = ref({ times: [], dates: [], count: [] })
const last5Days = ref({ times: [], dates: [], count: [], desc: [] })
const last30Days = ref({ dates: [], count: [] })
const last6Months = ref({ dates: [], count: [] })
const transMonths = ref({ months: [], count: [] })
const transYears = ref({ years: [], count: [] })
const description = ref(null)
// const sinceBeginningOfYear = ref({ dates: [], values: [] })
const loading = ref(false)
const error = ref(null)

async function fetchTransactionsStats () {
  loading.value = true
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tx_counters/?format=json')
    processTransactionsData(response.data) // Process the data
  } catch (err) {
    error.value = err.message || 'Error fetching data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function processTransactionsData (data) {
  // Reset current data
  today.value = { times: [], dates: [], count: [] }
  last5Days.value = { times: [], dates: [], count: [], desc: [] }
  last30Days.value = { dates: [], count: [] }
  last6Months.value = { dates: [], count: [] }
  transMonths.value = { months: [], count: [] }
  transYears.value = { years: [], count: [] }
  description.value = null

  // Function to format date into a string
  const formatDate = (input) => input.toISOString().split('T')[0]
  const now = new Date()
  const fiveDaysAgo = new Date(now.getTime() - (5 * 24 * 60 * 60 * 1000))
  const formattedToday = formatDate(now) // Use 'now' to get the start of today formatted
  const formattedFiveDaysAgo = formatDate(fiveDaysAgo) // Format 'fiveDaysAgo' for consistency
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
  const formattedThirtyDaysAgo = formatDate(thirtyDaysAgo) // Format 'thirtyDaysAgo' for consistency
  const sixMonthsAgo = new Date(now.getTime() - (182 * 24 * 60 * 60 * 1000))
  const formattedSixMonthsAgo = formatDate(sixMonthsAgo) // Format 'sixMonthsAgo' for consistency
  // const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
  // const startOfYear = new Date(now.getFullYear(), 0, 1)

  // Define an array of month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  // Process the data statistics
  data.forEach((item) => {
    const receivedAt = item.date
    const date = new Date(receivedAt)
    const monthKey = date.getMonth() // getMonth() returns 0-11, adding 1 to get 1-12
    const yearKey = date.getFullYear()
    const monthName = monthNames[parseInt(monthKey, 10)] // Ensure monthKey is treated as an integer and used to access monthNames

    // Today's transactions, every 30 minutes
    if (receivedAt === formattedToday) {
      today.value.times.push(item.time)
      today.value.dates.push(item.date)
      today.value.count.push(item.count)
    }

    if (receivedAt >= formattedFiveDaysAgo && receivedAt <= formattedToday) {
      last5Days.value.times.push(item.time)
      last5Days.value.dates.push(item.date)
      last5Days.value.count.push(item.count)
      last5Days.value.desc.push(`${item.date} ${item.time}`)
    }

    // Adjust the conditions for last 30 days and last 6 months if needed to exclude today's transactions
    if (receivedAt >= formattedThirtyDaysAgo) {
      if (!last30Days.value.dates.includes(item.date)) {
        last30Days.value.dates.push(item.date)
        last30Days.value.count.push(item.count)
      } else {
        last30Days.value.count[last30Days.value.dates.indexOf(item.date)] += item.count
      }
    }

    if (receivedAt >= formattedSixMonthsAgo) {
      if (!last6Months.value.dates.includes(item.date)) {
        last6Months.value.dates.push(item.date)
        last6Months.value.count.push(item.count)
      } else {
        last6Months.value.count[last6Months.value.dates.indexOf(item.date)] += item.count
      }
    }

    // Aggregate months using monthName instead of monthKey
    const monthIndex = transMonths.value.months.indexOf(monthName + ' ' + yearKey)
    if (monthIndex === -1) {
      transMonths.value.months.push(monthName + ' ' + yearKey)
      transMonths.value.count.push(item.count)
    } else {
      transMonths.value.count[monthIndex] += item.count
    }

    // Aggregate years
    const yearIndex = transYears.value.years.indexOf(yearKey)
    if (yearIndex === -1) {
      transYears.value.years.push(yearKey)
      transYears.value.count.push(item.count)
    } else {
      transYears.value.count[yearIndex] += item.count
    }
  })
}

export { fetchTransactionsStats, today, last5Days, last30Days, last6Months, transMonths, transYears }

onMounted(fetchTransactionsStats)
setInterval(fetchTransactionsStats, 3000)
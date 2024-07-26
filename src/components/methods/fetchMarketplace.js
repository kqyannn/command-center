// import { ref } from 'vue'
// import axios from 'axios'
// import moment from 'moment-timezone'

// // Stats for orders
// const ordersToday = ref(null)
// const ordersYesterday = ref(null)
// const totalOrders = ref(null)

// // Stats for revenue
// const revenueToday = ref(null)
// const revenueYesterday = ref(null)
// const totalRevenue = ref(null)

// // const sinceBeginningOfYear = ref({ dates: [], values: [] })
// const loading = ref(false)
// const error = ref(null)

// async function fetchMarketplaceStats () {
//   loading.value = true
//   try {
//     const response = await axios.get('http://127.0.0.1:8000/api/marketplace/orders?format=json')
//     computeMarketplaceData(response.data) // Process the data
//   } catch (err) {
//     error.value = err.message || 'Error fetching data'
//     console.error(err)
//   } finally {
//     loading.value = false
//   }
// }

// function computeMarketplaceData (data) {
//   // Reset stats for orders
//   ordersToday.value = 0
//   ordersYesterday.value = 0
//   totalOrders.value = 0

//   // Stats for revenue
//   revenueToday.value = 0
//   revenueYesterday.value = 0
//   totalRevenue.value = 0
//   // Function to format date into a string
//   const formatDate = (date) => {
//     return moment(date).format('YYYY-MM-DD')
//   }

//   // Define an array of month names

//   // Process the data statistics
//   data.forEach((item) => {
//     const date = new Date(item.date)
//     const dayKey = date.toISOString().split('T')[0] // 'YYYY-MM-DD'
//     const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` // 'YYYY-MM'
//     const yearKey = date.getFullYear().toString() // 'YYYY'

//     // Aggregate days
//     const dayIndex = ordersDays.value.dates.indexOf(dayKey)
//     if (dayIndex === -1) {
//       ordersDays.value.dates.push(dayKey)
//       ordersDays.value.values.push(1)
//       revenueDays.value.dates.push(dayKey)
//       revenueDays.value.values.push(parseFloat(item.revenue))
//     } else {
//       ordersDays.value.values[dayIndex] += 1
//       revenueDays.value.values[dayIndex] += parseFloat(item.revenue)
//     }

//     // Aggregate months
//     const monthIndex = ordersMonths.value.months.indexOf(monthKey)
//     if (monthIndex === -1) {
//       ordersMonths.value.months.push(monthKey)
//       ordersMonths.value.values.push(1)
//       revenueMonths.value.months.push(monthKey)
//       revenueMonths.value.values.push(parseFloat(item.revenue))
//     } else {
//       ordersMonths.value.values[monthIndex] += 1
//       revenueMonths.value.values[monthIndex] += parseFloat(item.revenue)
//     }

//     // Aggregate years
//     const yearIndex = ordersYears.value.years.indexOf(yearKey)
//     if (yearIndex === -1) {
//       ordersYears.value.years.push(yearKey)
//       ordersYears.value.values.push(1)
//       revenueYears.value.years.push(yearKey)
//       revenueYears.value.values.push(parseFloat(item.revenue))
//     } else {
//       ordersYears.value.values[yearIndex] += 1
//       revenueYears.value.values[yearIndex] += parseFloat(item.revenue)
//     }
//   })
//   const now = moment().tz('Asia/Manila').toDate()
//   const formattedToday = formatDate(now)
//   const todayIndex = ordersDays.value.dates.indexOf(formattedToday)
//   if (todayIndex === -1) {
//     ordersDays.value.dates.push(formattedToday)
//     ordersDays.value.values.push(0)
//     revenueDays.value.dates.push(formattedToday)
//     revenueDays.value.values.push(0)
//   }
// }
// export { ordersToday, ordersYesterday, totalOrders, revenueToday, revenueYesterday, totalRevenue, fetchMarketplaceStats }

// setInterval(fetchMarketplaceStats, 3000)

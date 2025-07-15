
![Logo](https://www.paytaca.com/_nuxt/paytaca_dark.eaa52369.png)


# Paytaca Command Center

This program is a project developed by Computer Science students from UP Tacloban College under their Internship Program at Paytaca. The program is a command center for displaying various information regarding the Paytaca app such as a dashboard, map, and data.


## Tech Stack

Front-end development:
- **Language**: HTML, CSS, Javascript
- **Frameworks**: Vue, Quasar

Back-end:
- **Language**: Python
- **Framework**: Django REST
## Dependencies

Run the following commands in the terminal to install dependencies:
```bash
npm install
pip install -r requirements.txt
```

*Note: the `requirements.txt` file is located at (`dir:/command_center/`)*
## Deployment

*To deploy the app, first ensure that the dependencies are properly **installed** and code is **cloned** from the repository.*

1. Running the Django server (`dir:/command_center_backend/`):
    ```bash
    python manage.py runserver
    ```

2. Running the listeners (`dir:/command_center_backend/`):

    - MQTT listener for Transactions:
        ```bash
        python manage.py mqtt_transactions
        ```
    - Watchtower listener for Merchant list:
        ```bash
        python manage.py update_merchants
        ```

3. Running the Quasar app (`dir:/root/`):
    ```bash
    quasar dev
    ```

## Authors

- [@kqyannn](https://www.github.com/kqyannn)
- [@aaflores7](https://www.github.com/aaflores7)
- [@essiervo](https://github.com/essiervo)


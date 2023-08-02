# Syska Hennessy Group - Meteorological Year Simulator

This project is a powerful React-based web application developed by M2x.AI for the Syska Hennessy Group. The application provides the ability to retrieve and simulate a Typical Meteorological Year (TMY) dataset based on specified location and range of years.

## Features

1. The application allows users to input a range of years and select a location via a Google Maps component.

2. On selection, the app provides a live preview of the location.

3. It uses the provided location and year range to download hourly temperature data from [Open-Meteo](https://open-meteo.com/).

4. The app then processes this data to simulate a TMY-like dataset of hourly temperatures throughout a typical year.

5. Users can customize their output by changing the "Statistic Type", allowing them to explore average or extreme weather scenarios.

## Architecture

The application is made up of a React frontend and a Python Flask backend. The frontend is hosted on GitHub Pages and communicates with the backend to process user inputs and provide results.

## Usage

To use the app, simply navigate to its GitHub Pages URL. Once there, enter your desired year range and use the Google Maps component to select a location. After selecting the location, you can modify the "Statistic Type" to suit your needs. The app will then process your request and provide a TMY-like dataset of hourly temperatures throughout a typical year for the specified location and year range.

## Contact

The application was developed by myself, Brandon Smith, a software consultant at M2x.AI. For any issues related to this project, please reach out to me at brandon@m2x.ai.

## About M2x.AI

M2x.AI is a consulting firm specializing in advanced technologies. We are proud to have partnered with Syska Hennessy Group for the development of this web application.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

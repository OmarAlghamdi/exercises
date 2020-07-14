Implementation of the exercises given during the weekly meeting on July/9.

To run the development server (nodemon) use the command `npm run dev`.

## The API
The Node server exposes 3 endpoints:
-   `/math/stat`: calculates simple descriptive statistics on array of number

        Method: POST

        Parameters: none

        Body: array of integers

        Response: Object {mean, median, mode}
-   `/math/fibonacci`: returns the Fibonacci number at the specified index.

        Method: GET

        Parameters: (Number) index

        Response: (Number) Fibonacci number

-   `/chess`: TODO

## Documentation
Documentation is auto-generated using [jsdoc](https://jsdoc.app/). To regenerate run the `npm run doc`.

UML diagrams are under the folder `./docs/diagrams/`. `src` is where the description of the diagrams is, and `png` is where the diagrams are as .png files.

The UML diagrams are generated using [PlantUML](https://plantuml.com/).
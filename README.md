Implementation of the exercises given during the weekly meeting on July/9.

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
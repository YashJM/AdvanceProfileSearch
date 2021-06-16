export function fetchData() {
    return fetch('https://studentsdataapi.herokuapp.com/list')
        .then(response => response.json())
}

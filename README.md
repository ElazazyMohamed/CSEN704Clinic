
# Bond Virtual Clinic

 A virtual clinic and pharmacy targeted to be a website that helps  connect between specialized doctors and patients.


## Tech Stack

**Client:** React, Redux toolkit, Material-UI, Vite.

**Server:** Node, Express.

**Database:** MongoDB.


## Installation

Clone the repo by using this command in the cmd but make sure you have GitHub CLI installed first

```bash
 gh repo clone advanced-computer-lab-2023/Bond-Clinic
```
Or

Install it with GitHub Desktop

Then after cloning, open a terminal on the project’s directory and type this command to create a .env file.
```bash
 cd backend
echo. > .env
```
Then, add the following MongoDB URI into the .env file.
```bash
MONGO_URI=mongodb+srv://soubky10:bond@bond-clinic.68bq09r.mongodb.net/?retryWrites=true&w=majority
```
Then, while you are in the backend directory you can install the node modules then run the server the default port is 4000 you can change it by adding your preferred port in the .env file.
```bash
npm i
npm run dev
```
You should see this message “Connected to MongoDB and running on port 4000”.

Now, on another terminal we want to run the frontend so we need to open the project’s directory and type the following commands.

```bash
cd frontend
npm i
npm run dev
```
It should run and show that it is running on localhost:5173.


    
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

#### Get all items

```http
  POST /api/upload-documents
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_document` | `file` | **Required**. ID document of the pharmacist |
| `degree_document` | `file` | **Required**. Pharmacy degree document |
| `Working license document` | `file` | **Required**. ID document of the pharmacist |

#### Get item

```http
  POST /api/add-medicine
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string ` | **Required**. Name of the medicine |
| `active_ingredients`      | `string ` | **Required**. Active ingredients of the medicine |
| `price`      | `string ` | **Required**. Price of the medicine |
| `quantity`      | `string ` | **Required**. Available quantity of the medicine |

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT](https://choosealicense.com/licenses/mit/)
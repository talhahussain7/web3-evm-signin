## Express Server - NodeJS

### Available Scripts

In the project directory, you can run:

#### `yarn`

Installs the required modules/packages needed for the server to run.

#### `node index.js`

Runs the server on Port 8080.

| Endpoint                          | Type |Request Body | Response body |
| --------------------------------- | ---| ------- | -------- |
| http://{hostname}/api/:public_address/register | POST |- |`{"success":true,"user":{"public_address":<PUBLIC_ADDRESS>,"isRegistered":true,"nonce":<INTEGER_VALUE>,"_id":<ID_VALUE>,"__v":0},"msg":"User registered successfully"}` |
| http://{hostname}/api/:public_address/nonce | GET |- |`{"nonce":<INTEGER_VALUE>,"isRegistered":true}` |
| http://{hostname}/api/:public_address/signature | POST |`{"signature":<SIGNATURE_HASH>}` |`{"success":true,"token":<JWT_TOKEN>,"user":<USER>,"msg":"You are now logged in."}` |


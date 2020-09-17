'use strict'

const Ws = use('Ws')

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each Websocket channel subscription.
|
*/
const globalMiddleware = []


/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
2``````````````````````| keys to run selected middleware on a given channel.
|
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Ws.channel('chat', 'ChatController').middleware(['auth'])
*/
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth'
}


Ws
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)

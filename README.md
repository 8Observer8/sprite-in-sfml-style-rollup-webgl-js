This example loads sprites from the FreeTexturePacker sprite sheet and uses a sprite in SFML style.

Buy me a chicory coffee: https://boosty.to/ivan_8observer8/donate This service supports PayPal.

Playgrounds:

- Plunker: https://plnkr.co/edit/StZ1atqDgy10YqX5?preview
- Replit: https://replit.com/@8Observer8/Sprite-in-SFML-style-using-pure-WebGL-10-and-JS

![image](https://github.com/8Observer8/sprite-in-sfml-style-rollup-webgl-js/assets/3908473/9056846a-8d1d-4783-a06d-2869107068e6)

Instruction for building and running the project in debug and release using Rollup:

- Install these packages globally with the command:

> npm i -g http-server rollup uglify-js

- Run http-server in the project directory:

> http-server -c-1

Note. The `-c-1` key allows you to disable caching.

- Start development mode with the following command:

> npm run dev

Note. Rollup will automatically keep track of saving changes to files and build a new index.js file ready for debugging. You can debug your project step by step in the browser by setting breakpoints.

- Go to the browser and type the address: localhost:8080/index.html

- Create a compressed file ready for publishing. Stop development mode, for example, with this command Ctrl + C in CMD, if it was launched before and enter the command:

> npm run release

Note. After this command, Rollup will create a compressed index.js file. Compression is done using the uglify-js package.

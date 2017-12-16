# TestWork2  Pisetskij Aleksandr

Demo Video  https://www.youtube.com/watch?v=sNj5kk4D4bE


cd ~TestWork2\src\AngularWebpackVisualStudio

npm i 

Problem witsh SASS Build -> Solition
https://github.com/sass/node-sass/issues/1579
Can't explain why the install file doesn't always get ran on each build. So my build script looks like this:

src\AngularWebpackVisualStudio\node_modules\node-sass\vendor\win32-x64-48\binding.node  <- delete this file if exsist
// npm update
// npm install
cd ...node_modules/node-sass/scripts/
node install.js
npm rebuild node-sass


npm run build-dev

dotnet restore

dotnet run

see http://localhost:5000/

1) To delete client tasks, click the context menu on the task record on the second table

2) TestWork2\src\AngularWebpackVisualStudio\ MyDb.db  <- delete this file for seed new data
When you start the program, create a new instance of the database


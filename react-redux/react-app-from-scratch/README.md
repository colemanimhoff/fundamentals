# React App From Scratch

Made with this [tutorial](https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/)

Disregard the versions when installing dependencies. This [tutorial](https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/)

## Initialize Your NPM Project

```bash
npm init -y
```

## Install React

```bash
npm install react react-dom
```

## Install Webpack

```bash
npm install --save-dev webpack webpack-dev-server webpack-cli
```
## Add Your Start Script

```json
"scripts": {
 "start": "webpack-dev-server --mode development",
},
```

## Install Babel

```bash
npm install --save-dev @babel/core @babel/preset-env \@babel/preset-react babel-loader
```

```bash
touch .babelrc`
```

Add the following your `babelrc` file

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

## React Hot Loader

```bash
npm install react-hot-loader
```
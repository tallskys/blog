---
title: "Creating an Infinite Scroll Gallery with Gatsby"
date: "2019-11-10"
draft: true
path: "/blog/gatsby-infinite-scroll"
---
In this post we will:

- Setup Gatsby locally using the Gatsby CLI

- Create pages in the Gatsby site

- Handle consistent layout through the site

- Create an infinite scroll image masonry

- Create a netlify function to fetch images

- Deploy and consume netlify functions locally

- Render images in a grid

- Configure netlify.toml

- Deploy app to netlify

## Set Up

Knowing HTML, CSS, JS, and some React is required for this.

Check that you have node and npm installed with
    `node -v && npm -v`

This command would output the versions of both node and npm. If not installed, proceed to [Nodejs.org](https://nodejs.org/) to download and install node and its package manager.

Install the Gatsby CLI globally with:

    `npm i -g gatsby-cli`

Once the CLI is installed, open a new folder and create a new Gatsby project using the default starter with `gatsby new netsby`

This command clones the default starter into the folder and installs all required dependencies.

Change directory to the project directory and install the required dependencies with: `cd netsby && npm i --save axios bulma react-infinite-scroll-component`

Here's a summary of the components:

- [Axios](https://github.com/axios/axios): This is used to make HTTP requests to an API.
- [Bulma](https://bulma.io/): A lightweight CSS framework for styling.
- [React-inifinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component): A simple and customizable infinite scroll component for React.

Once these are installed, start a development server with:

`gatsby develop`

This will spin up a dev server on localhost:8000. Gatsby comes with a hot reload feature built in, so any changes you make to the source file will reload the page in the browser instantly.

Now let's get to layout and some styling.

## Structure
Everything in Gatsby is a component. Gatsby is unique in the way that it serves individually exported JS files in the `src/pages` folder as a page in the app.

In this project, individual components are written in `src/components`. Each exported component can be reused in the entirety of the app.

Gatsby provides other default files to extend the functionality further or configure the app. `gatsby-config.js` contains the config for all plugins used in the app.

### Configure Layout

The site layout will be developed as a component and reused across the application. The components/layout.js file currently exports the layout of the app as designed in the starter. Remove all the content of the layout.js file, import all required dependencies and components with:

    import React from "react"
    import PropTypes from "prop-types"
    import { useStaticQuery, graphql } from "gatsby"
    
    import Header from "./header"

Here, React and prop-types were imported alongside useStaticQuery and GraphQL. useStaticQuery, shipped in Gatsby v2 allows us to make GraphQL data queries in non-page components. This data fetching is static and happens during build, hence the term Static Query.

The `Header` component which houses the navbar is also imported in the component. This `Header` component will be created shortly. Define and export the `Layout` component with the following:

    const Layout = ({ children }) => {
      const data = useStaticQuery(graphql`query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }`)
    
      return (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 900,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,
            }}
          >
            <main>{children}</main>
          </div>
        </>
      )
    }
    
    Layout.propTypes = {
      children: PropTypes.node.isRequired,
    }
    
    export default Layout

Here the `useStaticQuery` hook is used to fetch the site title from the siteMetadata. This `siteTitle` is subsequently passed in the header component as props. The base style for the `div` enclosing the children of the layout is also configured.

Go on ahead to `gatsby-config.js` in the root directory to change the site title and description. Modify the `siteMetada` property to:

    siteMetadata: {
        title: `Netsby`,
        description: `all the animals!`,
        author: `you`,
      },

In components/header.js, import the required modules and components with:

    import { Link } from "gatsby"
    import PropTypes from "prop-types"
    import React from "react"

Create the Header functional component which defines a siteTitle prop with:

    const Header = ({ siteTitle }) => (
      <header>
        <nav className="navbar is-dark" style={{ marginBottom: "2em" }}>
          <div className="navbar-brand">
            <Link
              to="/"
              style={{
                marginLeft: "3em",
                padding: "10px",
              }}
              className="has-text-white is-size-3"
            >
              {siteTitle}
            </Link>
          </div>
          <div className="navbar-end" style={{ marginRight: "3em" }}>
            <div className="navbar-item">
              <Link
                to="/"
                style={{
                  padding: "10px",
                }}
                className="has-text-white"
              >
                Home
              </Link>
              <Link
                to="/gallery/"
                style={{
                  padding: "10px",
                }}
                className="has-text-white"
              >
                Gallery
              </Link>
            </div>
          </div>
        </nav>
      </header>
    )
    
    export default Header

Two routes were designated in the navbar, while `/` directs to the homepage, `/gallery/` directs to the gallery page to be created shortly. The `<Link/>` component shipped with gatsby is used to navigate the routes in the single-paged app and ships with its own `to` attribute which accepts the slug of the route.

Bulma classes were used to style this component. For Bulma to work, we will import it in the `index.js` page shortly.

Next, we will utilize this layout component on the homepage.

## Create Pages

### Home page

In src/pages/index.js, wipe the default starter code in the file and import required dependencies and components with:

    import React from "react"
    import { Link } from "gatsby"
    import Layout from "../components/layout"
    import SEO from "../components/seo"
    import "bulma/css/bulma.min.css"

Notice how the minified Bulma CSS file was imported. Also, the Layout component was imported alongside the SEO component, which was included in the starter by default.

(Note about Bulma here since I don't understand it)

Define and export the page using the imported components with:

    const IndexPage = () => (
      <Layout>
        <SEO title="Home" />
        <div className="has-text-centered" style={{ marginTop: "20%" }}>
          <h1 className="is-size-2">Welcome to Pride Rock! . . . or nah 😹</h1>
          <p className="is-size-5" style={{ marginTop: "2%" }}>
            Find within, a fire doggo infinite image gallery built with Gatsby, and
            Images served using Netlify functions from Unsplash. Perfecto!
          </p>
          <button className="button is-dark is-large" style={{ marginTop: "10%" }}>
            <Link to="/gallery/" className="has-text-white">
              Open Sesame! 🔥
            </Link>
          </button>
        </div>
      </Layout>
    )
    
    export default IndexPage

Bulma classes were also used to style this page.

### **Gallery Page**

In the same `src/pages` directory, create a new folder named `gallery.js`. Similar to the index page, import the SEO component as well as the Layout component. Do this with:

    import React from "react"
    import Layout from "../components/layout"
    import SEO from "../components/seo"

Create and export the page component with:

    const Gallery = () => {
      return (
        <Layout>
          <SEO title="Gallery" />
          <h1 className="is-size-3">Images from Unsplash...</h1>
          <p style={{ marginBottom: "5%" }}>
            Now this is the Law of the Jungle, as old and true as the sky, for as
            long as you keep scrolling, you shall find more doggo images 🐶 🐕.
          </p>
        </Layout>
      )
    }
    
    export default Gallery

Once you save the page, the browser should refresh with the complete pages though the gallery page will only have the text and no images yet.

You can restart the dev server to rebuild.

## Create The Image Gallery

Like we stated earlier, the good thing about building with tools like Gatsby is we can make API calls in components and pass the data to the DOM during runtime, giving the experience of a dynamic app in a static environment. The `react-infinite-scroll-component` will be used to create the infinite scroll whereas the Images will be fetched from Unsplash using netlify functions.

In `src/components` create a new component named `InfiniteImages.js`. In the component, import the required dependencies with:

    import React from "react"
    import PropTypes from "prop-types"
    import InfiniteScroll from "react-infinite-scroll-component"

For this gallery, we'll need two components:

1. A component to hold the Image gallery view.
2. A component to handle state, data fetching and propagation to the Image gallery view.

These components can be split into further subcomponents but for the sake of simplicity, we'll leave it at these two and even have them co-located in the same file.

In `InfiniteImages.js`, create a functional component after the dependency imports named `ImageGallery`. This is the gallery view. Define the components to accept props of `images`, `loading`, and `fetchImages`. Do this with:

(put the whole code here and not just snippets like they do)

    import ...
    
    const ImageGallery = ({ images, loading, fetchImages }) => {
      // Create gallery here
      return (
        <InfiniteScroll
          dataLength={images.length}
          next={() => fetchImages()}
          hasMore={true}
          loader={
            <p style={{ textAlign: "center", marginTop: "1%" }}>
              More doggo incoming 🐕 🐕...
            </p>
          }
        >
          <div className="image-grid">
            {!loading
              ? images.map(image => (
                  <div className="image-item" key={image.id}>
                    <img src={image.urls.regular} alt={image.alt_description} />
                  </div>
                ))
              : ""}
          </div>
        </InfiniteScroll>
      )
    }

The `InfiniteScroll` component imported takes props of:

- dataLength: The length of the rendered data.
- next: A function to be called once a scroll threshold is reached.
- hasMore: A boolean to indicate the existence of more data to be rendered on fetch.
- Loader: A component or string to the displayed when images are being fetched.

In the infinite scroll, the array of images passed through the `images` prop is traversed and Images rendered in a grid. Properties of each image object are passed as data to the `key`, `alt` value and ultimately the image `src`.

The masonry is styled with css-grid. Create a custom CSS file named `gallery.css` in the components folder and edit it to:

    .image-grid {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-auto-rows: minmax(50px, auto);
    }
    
    .image-grid .image-item:nth-child(5n) {
      grid-column-end: span 2;
    }
    
    .image-grid img {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

Import the CSS file to the InfiniteImages.js component with:

`import "./gallery.css`

With the view complete, let's set up the parent component handling fetch from the API.

Create a component in `InfiniteImages.js` named `InfiniteImages`.

This functional component uses the React `useState` and `useEffect` hooks to handle state and lifecycle computation, respectively. Axios is also used to make HTTP requests. Import Axios and the hooks in `InfiniteImages.js` with:

    import React, { useState, useEffect } from "react"
    import axios from "axios"
    
    // Component logic below

With hooks imported, define the InfiniteImage component with:

    const InfiniteImages = () => {
      // Hold state
      const [images, setImages] = useState([])
      const [loading, setLoading] = useState(true)
    
      // Fetch images on component mount
      useEffect(() => {
        fetchImages()
      }, [])
    
    
        // API endpoint
        const endpoint = "<Endpoint here once available>"
    
        // Fetch Images from functions
      const fetchImages = () => {
        axios(endpoint).then(res => {
          setImages([...images, ...res.data.images])
          setLoading(false)
        })
      }
      return (
        <ImageGallery images={images} loading={loading} fetchImages={fetchImages} />
      )
    }

Here, we created state variables to hold the fetched images and also to store the state of the fetch operation. The `images` variable defaults to an empty array while the loading variable defaults to `true` as we assume by default, the images are loading once the component mounts.

The `useEffect` hook is used to call the `fetchImages` function once the component is mounted. An empty array as a second argument signifies that the function will only run when the component mounts.

A `fetchImages` function is created which uses axios to make a GET request to a specified API. The returned data is spread in the `images` array in state. Thus any new data fetched is added to existing ones in state. The `loading` variable is also set to false as the fetch operation is complete.

The `ImageGallery` component earlier created is used to render the gallery with the required data.

Assign the Proptypes to the `ImageGallery` component and export the `InfiniteImage` module with:

    import...
    
    const ImageGallery = ({ images, loading, fetchImages }) => {
      // Create gallery here
      return (
        // Component logic here
      )
    }
    
    const InfiniteImages = () => {
      // Component logic here
    }
    
    ImageGallery.propTypes = {
      images: PropTypes.array,
      loading: PropTypes.bool,
      fetchImages: PropTypes.func,
    }
    
    export default InfiniteImages

With this, we have the gallery set up, what's missing is the API endpoint. We'll proceed to define a Netlify function to handle that.

## Create The Netlify Function

Netlify functions are AWS lambdas managed directly on Netlify. With this, we abstract the management and scaling of a traditional server. Multiple functions can be created and used across an application after the application is built.

These functions in JavaScript are `.js` files stored in any designated directory in the project's repository and specified on Netlify or in the netlify.toml config file in the root directory of a project.

Creating a Netlify function is seamless. It is either created in a functions directory or a build tool is used to create the function from a source folder into the functions folder.

If you are familiar with backend development, creating node servers and APIs would probably be a breeze, for Netlify Functions written in JavaScript, knowledge of Nodejs is not compulsory as Netlify ships Netlify-lambda. This is a tool to help with building Netlify functions from modern JavaScript workflows using webpack/babel.

We will employ this in this tutorial to build functions written in ES6 syntax into a functions directory.

For this gallery, we will query a free Unsplash API to obtain super cute images of dogs and display them in a masonry. Head to Unsplash, signup to [create a new app and get an access key](https://unsplash.com/developers).

While this API can be consumed directly in the app, we would like to abstract this image fetching process to our API, thus securing access/private keys or any other backend logic. In other applications, business or other logic can also go in our API.

### **Install Functions Build tool**

`netlify-lambda` CLI is used to run functions locally as well as create a deployable build. These functions can be written with modern JS workflows before being bundled into a single build using webpack/babel. For this project, we'll create a folder to house the locally written functions as well as the deployable functions.

Install the netlify-lambda CLI with:

`npm i -g netlify-lambda`

With this we can serve the functions locally with:

`netlify-lambda serve <path-to-source-folder>`

A deployable build can be created with :

`netlify-lambda build <path-to-source-folder>`

### **Create a Function and Source Directory**

Create a folder in the `src` directory named `lambda`. This serves as the source folder will contain all the functions as written. Create a second folder in the root directory of the project named `functions`. This, in turn, will hold all deployable functions. For Netlify to recognize the functions folder, we need to specify it in the Netlify config file. Create a file in the root directory of the project named `netlify.toml`. Add this config with:

    [build]
      Functions = "functions"

https://<root-url-of-app>/.netlify/functions/<function-name>

### **Define The Fetch Function**

Lambda functions are JS files which export a handler method. Each function takes three parameters:

- event: This is an object received when the function is triggered.
- context: This contains the conditions in which the function was called.
- callback: This is returned on function execution and contains the error if any, as the first parameter. It also contains a response payload as the second.

In the project, create a file named `fetch.js` in `src/lambda`, configure the function with:

    import axios from "axios"
    import config from "../../config"
    
    exports.handler = function(event, context, callback) {
      const apiRoot = "https://api.unsplash.com"
      const accessKey = process.env.ACCESS_KEY || config.accessKey
    
      const doggoEndpoint = `${apiRoot}/photos/random?client_id=${accessKey}&count=${10}&collections='3816141,1154337,1254279'`
    
      axios.get(doggoEndpoint).then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            images: res.data,
          }),
        })
      })
    }

In here, axios which is imported is used to make an API call to the Unsplash API, and the returned data is sent in the callback with a status code of 200. The API Key will be stored as an environment variable on Netlify and also in a config file for local usage.

Create a file named `config.js` in the root directory and add the API key from Unsplash with:

    const config = {
      accessKey: "<Add access key>",
    }
    
    export default config

Be sure to add the config file to `.gitignore` so it's not added to your repository if public.

State a dev server for the functions with:

`netlify-lambda serve src/lambda`

This creates a server on `[http://localhost:9000](http://localhost:9000/fetch)`.

Navigate to `[http://localhost:9000/fetch](http://localhost:9000/fetch)` to see the data fetched from the API being displayed on the browser.

To create a build in the functions folder, run:

`netlify-lambda build src/lambda`

This creates a build in the functions folder ready to be deployed.

We have the functions set up and running, let's configure it for local usage.

### **Configure Function for Local Usage**

Using the function as is in the local dev server on Gatsby would throw a CORS error. Advanced proxying in Gatsby.js, affords us the ability to use a proxy middleware to proxy the functions in our local environment consequently bypassing CORS. Install [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) with:

npm i --save-dev http-proxy-middleware

Configure the proxy middleware in gatsby-config.js with:

    let proxy = require("http-proxy-middleware")
    
    module.exports = {
      siteMetadata: {
        // define site metadata
      },
      // Enables the use of function URLs locally
      developMiddleware: app => {
        app.use(
          "/.netlify/functions/",
          proxy({
            target: "http://localhost:9000",
            pathRewrite: { "/.netlify/functions/": "" },
          })
        )
      },
      plugins: [
        // define plugins
      ],
    }

The `/.netlify/functions/` endpoint in development is proxied to `[http://local:9000](http://local:9000)` and the path is re-written, this way `[http://localhost:9000/fetch](http://localhost:9000/fetch)` becomes `/.netlify/functions/fetch` which is also the valid local endpoint for the function.

Pass the API endpoint to the axios request in the `InfiniteImages` function in `src/components/InfiniteImages.js`. Do this with:

    import // ...
    
    const ImageGallery = ({ images, loading, fetchImages }) => {
      // Component logic here
    }
    
    const InfiniteImages = () => {
      // Hold state
      const [images, setImages] = useState([])
      const [loading, setLoading] = useState(true)
    
      // Fetch images on component mount
      useEffect(() => {
        fetchImages()
      }, [])
    
      // Fetch Images from functions
      const fetchImages = () => {
        axios("/.netlify/functions/fetch").then(res => {
          setImages([...images, ...res.data.images])
          setLoading(false)
        })
      }
      return (
        <ImageGallery images={images} loading={loading} fetchImages={fetchImages} />
      )
    }
    
    ImageGallery.propTypes = {
        // Define proptypes
    }
    
    export default InfiniteImages

Restart the Gatsby dev server, while ensuring the server of the local function is running. Here's what the app looks now:

# Deploying to Netlify

At this point, the app works on our local environment. Before deploying to Netlify, re-build the functions with:

`netlify-lambda build src/lambda`

Run a Gatsby build to verify the build process works without errors. Do this with:

`netsby build`

Next is to deploy to a Git provider.

### **Push to Git Provider**

Create a new repository on a remote git provider. Initialize the repository on your local machine, stage all your files, commit and push to the new remote repository.

Ensure the `config.js` file in the root directory is added to `.gitignore`.

### **Deploy On Netlify**

Go on to Netlify and create an account. Use the "New site from Git" button to add a new site.

On the "Connect to Git Provider" tab, select GitHub or whichever provider you used and authorize your account. In the next tab, pick the repository you deployed to or use the search function to search for the repository.

Configure the deploy settings with the build command as `gatsby build` and publish directory as `public`. Click the "Show advanced" button then the "new variable" button to add a new environment variable.

(screenshots here)

Hit the "Deploy site" button to deploy.

Netlify deploys the site and utilizes the functions in the functions directory after build. These functions are not exposed on the client side except the functions directory is in the publish directory.

Note that the build command, publish directory and environment variables can also be set in the `netlify.toml` file of the project.

In this post, we saw an overview of static sites, their features, importance, going dynamic with fetching dynamic content using serverless functions and an overview of serverless functions.

We also built an Infinite Scroll Image gallery using Gatsby with data from a Netlify function. While the free tier of Netlify functions is substantial for building applications, it's essential to [increase the memory capacity of functions](https://www.netlify.com/blog/2019/05/30/increasing-the-memory-capacity-for-netlify-functions/) to accommodate larger workloads.
# Test Netlify
This is an example to test deploying using Netlify. Here's a guide for you to deploy with Netlify.

## What is Netlify?
Netlify is a platform for continous deployment. Hold up, *what does that really mean?*

> Every change that passes the automated tests is deployed to production automatically.

[Check out this post](https://puppet.com/blog/continuous-delivery-vs-continuous-deployment-what-s-diff) to understand the difference between `Continous Delivery` vs. `Continous Deployment`.

> Essentially, Continuous Delivery doesn't mean every change is deployed to production ASAP. It means every change is proven to be deployable at any time.

Anyway, back to what Netlify is—actually, let's look at **two things** it does for our us (things we're concerned with in this context).

1. **Push your site live**: Publishes our site after a simple `git push` command
2. **Automates deployment**: Automates our build and runs tests to deploy

Essentially, as soon as you push your changes to a git repository (`git push`), Netlify automatically detects that new changes were pushed, runs some tests to make sure everything works, then automates our build (I'll explain below), and serves your static site.

> Of course, there's more to Netlify than this. Check out [their feature's page](https://www.netlify.com/features/) to learn more.

**It sounds like a lot, but it works like magic.**

## Netlify Setup
To use Netlify, sign in via GitHub, GitLab, or BitBucket. Once you're logged in, select the repo you'd like to use Netlify for. Once you get here, you'll see a screen like the following:

![Create New Site Screenshot](https://i.imgur.com/t4inTR1.png)

Here you're telling Netlify to deploy changes from the `master` branch. In the last two fields, Netlify is asking you:

> "Hey, if all the tests pass, which command should I to use to build your project? And once I build it, which folder will the build be in?"

### Setting up Build Command & Dir
This means that for Netlify to do its magic, you need to define a build script, along with a build path.

If you're using JavaScript, you can define the **build command** in your `package.json` file and your **build directory** in your `webpack.dev.js` file or whichever module bundler you're using.

```json
// package.json
"scripts": {
  "dev": "webpack-dev-server --config webpack.config.dev.js --mode development --color",
  "build": "webpack --config webpack.config.prod.js", // <-- this is the build command
}
```

```js
// webpack.config.dev.js
module.exports = {
  entry: [ 'webpack/hot/dev-server', './src/index.jsx' ],
  output: {
    path: path.join(__dirname, 'dist'), // <-- this is the build directory
    filename: 'bundle.js',
    publicPath: '/',
  },
  // more webpack config
}
```

Now if you do `git push`, this should push your project live to `{project-name}.netlify.com`.

## Setting a Custom Domain
If you want to use a custom domain, it's quite straightfoward, although **you might run into some bottlenecks**.

To do this, you'll need to do two things:
1. Point your domain's nameservers to Netlify
2. Set DNS/resource records

> I am using Google Domain

### Domain nameserver
Go to `Domain Settings -> Domain Management`. Once you provide Netlify with your custom domain, then it'll provide you with a list of nameservers that you can add in the DNS panel of your domain registrar service (Google Domains, GoDaddy).

### DNS/Resource Records
Netflify will generate these for you, like the following:

![DNS Record](https://i.imgur.com/YRolkiX.jpg)

Now here's the caveat with the first one:
**You can't set "website.com" as a CNAME record.** You can set the bottom one like this:

| name | type  | ttl  | data                     |
|------|-------|------|--------------------------|
| www  | CNAME | 3600 | keshav-test.netlify.com. |

> Check out [response on StackExchange about this](https://superuser.com/a/264914).

To set the first one, we're going to use a `A` record. The `A (IPv4 address)` record maps the domain name of a host to the IP address of that host (name-to-address mapping).

Basically, you need to get an IP address of Netlify and map it to the domain name. **So, how do you find the IP address of Netlify?** Netlify has a page called [Custom Domains](https://www.netlify.com/docs/custom-domains/#dns-configuration) and under the `DNS Configuration` section, you'll find this:

![IP Address](https://i.imgur.com/HBRR9dO.jpg)

So in your CNAME records, it should look like this:
| name | type  | ttl  | data          |
|------|-------|------|---------------|
|  @   |   A   | 3600 | 104.198.14.52 |

**AWESOME**. After this, everything comes together and looks like this:

![GoDaddy Example](https://i.imgur.com/k2jUS3D.jpg)

Now, you if go to your *custom domain*, you should the magic. **Congrats** 🎉🎈🎊

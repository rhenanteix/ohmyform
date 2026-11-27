<p align="center">
  <img src="public/logo.png" alt="OhMyForm" width="100%" />
</p>

<h3 align="center">The open source form builder that refused to stay retired.</h3>

<p align="center">
  <a href="https://github.com/ohmyform/ohmyform/graphs/contributors"><img alt="Latest Release" src="https://badgen.net/github/tag/ohmyform/ohmyform" /></a>
  <a href="https://github.com/ohmyform/ohmyform"><img alt="Project Status" src="https://badgen.net/github/checks/ohmyform/ohmyform" /></a>
  <a href="https://github.com/ohmyform/ohmyform"><img alt="Last Commit" src="https://badgen.net/github/last-commit/ohmyform/ohmyform" /></a>
  <a href="https://hub.docker.com/r/ohmyform/ohmyform"><img alt="Docker Pulls" src="https://badgen.net/docker/pulls/ohmyform/ohmyform" /></a>
  <a href="https://app.lokalise.com/public/379418475ede5d5c6937b0.31012044/"><img alt="Lokalise" src="https://badgen.net/badge/Lokalise/EN/green?icon=libraries" /></a>
  <a href="https://discord.gg/MJqAuAZ"><img alt="Discord" src="https://img.shields.io/discord/595773457862492190.svg?label=Discord%20Chat" /></a>
  <a href="https://opencollective.com/ohmyform-sustainability"><img alt="Financial Contributors on Open Collective" src="https://opencollective.com/ohmyform-sustainability/all/badge.svg?label=financial+contributors" /></a>
</p>

<p align="center">
  <a href="https://demo.ohmyform.org/">Demo</a> ·
  <a href="#quickstart">Quickstart</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="#how-to-contribute">Contribute</a> ·
  <a href="https://discord.gg/MJqAuAZ">Discord</a>
</p>

> An **open source alternative to Typeform** for creating stunning, mobile-ready forms, surveys and questionnaires. Self-host it, own your data, and keep it fun.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ohmyform/ohmyform/tree/master)

---

## 🎬 Plot twist

In a previous episode, the original maintainers announced that OhMyForm was winding down and pointed everyone to **[Formbricks](https://formbricks.com)**, a far more feature-rich project that they endorsed wholeheartedly. And honestly? Fair enough. Formbricks is a great project, with a big team, a polished product and a very serious roadmap.

But then someone looked at the repository and said:

> *"This project still has a lot of life in it. Let's modernize it."*

So here we are. **OhMyForm is back**, being refreshed from the ground up by a new maintainer. 🎉

### A very serious comparison with Formbricks

| | **OhMyForm** | **Formbricks** |
|---|---|---|
| Open source | ✅ | ✅ |
| Great project worth starring | ✅ | ✅ (seriously, go star it) |
| Name that makes you exclaim "Oh my!" | ✅ | ❌ |
| Name that sounds like you build forms out of bricks | ❌ | ✅ |
| Scrappy underdog energy | 💯 | 🏢 |
| Comeback arc | ✅ | Not needed |

We have nothing but respect for Formbricks. Think of this as a friendly rivalry, or as a comeback story where the underdog gets a new coat of paint. If Formbricks fits your needs better, use it, and please give them a ⭐. If you want a lighter, community-driven, self-hostable form builder that is getting a modern makeover, you are in the right place.

> **Heads up:** this README describes where OhMyForm *is* and where it is *going*. The [Roadmap](#roadmap) is explicit about what is done and what is still in progress. We don't do vaporware here, only enthusiasm.

---

## Table of Contents

- [Plot twist](#-plot-twist)
- [Features](#features)
- [Roadmap](#roadmap)
- [Quickstart](#quickstart)
- [Project structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Where to get help](#where-to-get-help)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)

---

## Features

- 🌍 **Multi-language support**
- 🧩 **11 question types**
- 📝 **Editable start and end pages**
- 📤 **Export submissions** to XLS, JSON or CSV
- 📊 **Native analytics** and Google Analytics support
- 🔗 **Embeddable forms**
- 🔌 **Forms as a Service API**
- 🔔 **Customizable notifications** on form submission
- 🪝 **Webhooks** on form submission
- 🚀 **Deployable** with Heroku and Docker Hub
- 🗄️ **PostgreSQL and SQLite** support

## Roadmap

OhMyForm is being modernized in the open. Items below are planned work, not promises carved in stone, and the list will evolve with community feedback.

### Modernization (in progress)

- [ ] Refresh the stack: update dependencies and runtime to current, supported versions
- [ ] Revamp the UI/UX with a modern, accessible and fully responsive design
- [ ] Dark mode
- [ ] Improve performance and bundle size
- [ ] Clean up the API and keep documentation up to date
- [ ] Better test coverage and a healthier CI pipeline
- [ ] Simplified Docker-based setup
- [ ] Rewrite the docs so the installation guide actually matches reality

### Feature ideas (carried over from the original roadmap)

- [ ] Custom subdomains for each user
- [ ] Encryption for all form data
- [ ] Typeform API integration
- [ ] Plugin / third-party integration support (e.g. Slack)
- [ ] Wiki for easy installation and setup
- [ ] Stripe / payment form field
- [ ] Custom background and dropdown field images
- [ ] File upload form field

Have an idea that isn't listed? [Open an issue](https://github.com/ohmyform/ohmyform/issues) and let's talk about it.

## Quickstart

Follow the documentation hosted on [OhMyForm.com](http://ohmyform.com/docs/install/). It is meant to be the main (and hopefully only) place to find up-to-date docs.

If you pull the repository, don't forget to initialize the submodules:

```bash
git clone https://github.com/ohmyform/ohmyform.git
cd ohmyform
git submodule update --init
```

Want to try it before installing anything? Visit the **[demo](https://demo.ohmyform.org/)**. Username and password are both `demo`.

> ⚠️ The demo instance is reset at least once for every new release, and possibly more often, without notice. Please don't use it to collect real responses.

## Project structure

OhMyForm is split into a few repositories:

| Part | Description |
|---|---|
| [API](https://github.com/ohmyform/api/tree/master/doc) | Backend and Forms as a Service API |
| [UI](https://github.com/ohmyform/ui/tree/master/doc) | Frontend: form builder and form rendering |

## How to Contribute

Contributions of every size are welcome: code, docs, translations, design, bug reports, memes about bricks.

- Read our [contributing guide](CONTRIBUTING.md)
- Pick up an issue or open a new one
- Help translate OhMyForm on [Lokalise](https://app.lokalise.com/public/379418475ede5d5c6937b0.31012044/)
- Join the conversation on [Discord](https://discord.gg/MJqAuAZ)

## Where to get help

[![Discord](https://img.shields.io/discord/595773457862492190.svg?label=Discord%20Chat)](https://discord.gg/Y2TTePM)

You can also open an issue on GitHub if you've found a bug or have a question.

## Alternative Social

- [Twitter](https://twitter.com/OhMyForm)
- [Instagram](https://www.instagram.com/ohmyform/)

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)]

[![Contributors](https://opencollective.com/ohmyform-sustainability/contributors.svg?width=890&button=false)](https://github.com/ohmyform/ohmyform/graphs/contributors)

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/ohmyform-sustainability/contribute)]

#### Individuals

[![Individuals](https://opencollective.com/static/images/opencollective-og-default.png)](https://opencollective.com/ohmyform-sustainability)

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/ohmyform-sustainability/contribute)]

[![](https://opencollective.com/ohmyform-sustainability/organization/0/avatar.svg)](https://opencollective.com/ohmyform-sustainability/organization/0/website)
[![](https://opencollective.com/ohmyform-sustainability/organization/1/avatar.svg)](https://opencollective.com/ohmyform-sustainability/organization/1/website)
[![](https://opencollective.com/ohmyform-sustainability/organization/2/avatar.svg)](https://opencollective.com/ohmyform-sustainability/organization/2/website)
[![](https://opencollective.com/ohmyform-sustainability/organization/3/avatar.svg)](https://opencollective.com/ohmyform-sustainability/organization/3/website)
[![](https://opencollective.com/ohmyform-sustainability/organization/4/avatar.svg)](https://opencollective.com/ohmyform-sustainability/organization/4/website)
[![](https://opencollective.com/ohmyform-sustainability/organization/5/avatar.svg)](https://opencollective.com/ohmyform-sustainability/organization/5/website)

## Acknowledgements

A big thank you to the original OhMyForm maintainers and every contributor who built this project and kept it alive for years. Their work is the foundation of everything here. And a friendly nod to the [Formbricks](https://formbricks.com) team: thanks for being the project that made us say "challenge accepted". 🧱➡️📝

---

<p align="center">Made with ☕, stubbornness and a fresh coat of purple gradient.</p>

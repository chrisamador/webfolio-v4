---
title: Connection Aware Components
date: 2018-07-02
images: {
  main_id: icon-test-image,
  type_id: icon-logo-react
}
tags:
  - react
  - javascript
meta: {
  primary_color: red,
  type_of: How To,
  min_read: 30 - 45,
  exp: 3 Yrs
}
---

Over the last decade, we have learned to embrace the uncertainty of developing for the web.

We don’t design sites for specific screen dimensions anymore, we make them responsive. We don’t assume ideal browsers and devices, we use progressive enhancement. When it comes to connectivity though, we still treat that as a binary choice: you’re either on- or offline.

Real connections are not that simple. Depending on your location, network condition or data plan, speeds can range from painfully slow to blazingly fast. The concept of “online” can be a drastically different experience for different users, especially on mobile.

What if there was a way to adapt websites based on our users connections, just like we do for varying display widths and browser capabilities? [The Network Information API](https://wicg.github.io/netinfo/) might enable us to do so.

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.  

   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses

## Links

[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

### Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

### Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy

### HR

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

## The Network Information API

This API is an editor’s draft by the WICG and currently available in Chrome. It can be accessed through the read-only property `navigator.connection` [(MDN)](https://google.com), which exposes several properties that provide information about a user’s current connection:

  - `connection.type:`

Returns the physical network type of the user agent as strings like “cellular”, “ethernet” or “wifi”.

  - `connection.downlink:`

This is a combined estimation of the network quality, based on the round-trip time and downlink properties. It returns a string that describes the connection as either: `slow-2g`, `2g`, `3g` or `4g`. Here’s how these categories are determined:

[categories image](./categories.png 'Hover text goes here')

## Responding to Changes

There is also an Event Listener available on the connection property that fires whenever a change in the network quality is detected:

### Responding to Changes

There is also an Event Listener available on the connection property that fires whenever a change in the network quality is detected:

#### Responding to Changes

There is also an Event Listener available on the connection property that fires whenever a change in the network quality is detected:

##### Responding to Changes

There is also an Event Listener available on the connection property that fires whenever a change in the network quality is detected:

###### Responding to Changes

There is also an Event Listener available on the connection property that fires whenever a change in the network quality is detected:

```
function onConnectionChange() {
    const { rtt, downlink, effectiveType } = navigator.connection
    console.log(`Round Trip Time: ${rtt}ms`)
    console.log(`Downlink Speed: ${downlink}Mb/s`)
    console.log(`Effective Type: ${effectiveType}`)
}
navigator.connection.addEventListener('change', onConnectionChange)
```

## Support

[categories image](./images/categories.png 'Hover text goes here')

 👉 Be aware that all of this is still experimental. Only Chrome and Samsung Internet browsers have currently implemented the API. It’s a very good candidate for progressive enhancement though - and support for other platforms is [on the way](https://google.com).

## Using a Higher-Order Component

The above example makes our component a bit unpredictable - it renders different things, even when given the same props. This makes it harder to test and maintain. To simplify it and enable reuse of our logic, moving the network condition check into a separate higher-order component might be a good idea.

Such a HoC could take in any component we want and make it connection-aware, injecting the effective connection type as a prop.

```
function withConnectionType(WrappedComponent, respondToChange = false) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                connectionType: undefined
            }
            // Basic API Support Check.
            this.hasNetworkInfoSupport = Boolean(
                navigator.connection && navigator.connection.effectiveType
            )
            this.setConnectionType = this.setConnectionType.bind(this)
        }

        componentWillMount() {
            // Check before the component first renders.
            this.setConnectionType()
        }

        componentDidMount() {
            // optional: respond to connectivity changes.
            if (respondToChange) {
                navigator.connection.addEventListener(
                    'change',
                    this.setConnectionType
                )
            }
        }

        componentWillUnmount() {
            if (respondToChange) {
                navigator.connection.removeEventListener(
                    'change',
                    this.setConnectionType
                )
            }
        }

        getConnectionType() {
            const connection = navigator.connection
            // check if we're offline first...
            if (!navigator.onLine) {
                return 'offline'
            }
            // ...or if reduced data is preferred.
            if (connection.saveData) {
                return 'saveData'
            }
            return connection.effectiveType
        }

        setConnectionType() {
            if (this.hasNetworkInfoSupport) {
                const connectionType = this.getConnectionType()
                this.setState({
                    connectionType
                })
            }
        }

        render() {
            // inject the prop into our component.
            // default to "undefined" if API is not supported.
            return (
                <WrappedComponent
                    connectionType={this.state.connectionType}
                    {...this.props}
                />
            )
        }
    }
}

// Now we can reuse the function to enhance all kinds of components.
const ConnectionAwareMedia = withConnectionType(Media)
```

## Further Reading

  - Network Information API Draft - WICG
  - Dev Thread in Chromium Forum- Intent to Ship
  - Official Example for Chrome - shows all currently available properties

## Installation

You can install Morabaa Provider via npm or yarn:

```bash
npm install morabaa-provider
# or
yarn add morabaa-provider
```

## Usage

Import the necessary components:

```javascript
import { ProviderContainer, PopupMe, Popup } from 'morabaa-provider';
```

In your App.tsx or App.js file, add the ProviderContainer component:

```javascript
import "./App.css"
import { ProviderContainer } from 'morabaa-provider';

const App = () => {
  return (
    <>
         {/* Your app code... */}
        <ProviderContainer childClass="child-class"overlayClass="overlay-class" />
    </>
    );
};

```
Add this code to your App.css file:

```css
.child-class {
  padding: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px #292a3922;
}

.overlay-class {
  backdrop-filter: blur(1px);
  background-color: #76798255;
}

```

Create Test.tsx or Test.js file and add this code to it:

```javascript
import React from "react";
import { ProviderContainer } from 'morabaa-provider';

const popupFunction = ({ title }) => {
  PopupMe({
    Component: PopupChild,
    componentProps: { title },
  });
};

const PopupExample = () => {
  const [title, setTitle] = React.useState("Hello World !");
  return (
    <div className="col" style={{ margin: "auto" }}>
      <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={({ target }) => target.select()} />
      <p
        className="button"
        onClick={() => {
          popupFunction({ title });
        }}>
        Open Popup
      </p>
    </div>
  );
};

export default PopupExample;

const PopupChild = ({ title }) => {
  return (
    <div className="col">
      <p className="text-light">Passed title</p>
      <p className="text-red"> {title} </p>
    </div>
  );
};

```

Add Test component to your App.tsx or App.js file:

```javascript
import "./App.css"
import React from "react";
import { ProviderContainer } from 'morabaa-provider';
import Test from "./Test";

const App = () => {
  return (
    <>
         {/* Your app code... */}
        <ProviderContainer childClass="child-class"overlayClass="overlay-class" />
        <Test />
    </>
    );
};

export default App;
```

The result should be like this:

![Alt text](public/gifs/first.gif)

## Features

- Create popups with custom content.
- Customize the popup options.


Use the PopupMe function to create popups in your application:

```javascript
const openPopup = () => {
  const closePopup = PopupMe({
    // Popup configuration options
  });

  // To close the popup, call the closePopup function
  setTimeout(closePopup, 5000); // Close the popup after 5 seconds
};
```

Customize the popup options as needed:

```javascript
const popupOptions = {
  id: 'example-popup',
  Component: MyCustomComponent,
  placement: 'center',
  overlay: true,
  // Additional options...
};

const closePopup = PopupMe(popupOptions) | Popup.remove('example-popup');

```

## Examples

Here are some usage examples of the library:

```javascript
// Example 1: Create a popup

const closePopup = PopupMe({
  // Popup configuration options
});

// Example 2: Print a document

const printDocument = () => {
  // Call the print function from your library
};

// Example 3: More examples...
```

## API Reference

### ProviderContainer

#### Props

- `offset` (object, optional): The offset for popups.
- `containerClass` (string, optional): CSS class for the popup container.
- `childClass` (string, optional): CSS class for the popup content.
- `overlayClass` (string, optional): CSS class for the overlay.
- `animationTime` (number, optional): Animation duration in milliseconds.
- `animation`  (string, optional): Animation type.


### PopupMe

#### Parameters

- `args` (object): Popup configuration options.

### Popup

#### Methods

- `create`: Create a new popup.
- `getPopup(id)`: Get a specific popup by ID.
- `getPopups()`: Get all popups.
- `getPopupIds()`: Get IDs of all popups.
- `remove(id)`: Remove a specific popup by ID.
- `removeAll()`: Remove all popups.

## Contributing

Contributions are welcome! If you'd like to contribute to this library, please follow our [contribution guidelines](

## License

This library is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Authors

- [Owl](https://github.com/Owl3CM)

## Acknowledgments

Special thanks to our contributors and supporters.

## Related Projects

- [Morabaa Utils]( ) - A collection of utility functions for web development.

## Support
If you have any questions or need assistance, please reach out to [saochiha@gmail.com]() or open an issue on GitHub.

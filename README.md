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

Create a ProviderContainer component to set up popup options:

```javascript
const PopupContainer = () => {
  return (
    <ProviderContainer
      primColor="var(--prim)"
      animationTime={300}
    >
      {/* Add your application components here */}
    </ProviderContainer>
  );
};
```

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

const closePopup = PopupMe(popupOptions);
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

- `primColor` (string, optional): The primary color for popups.
- `offset` (object, optional): The offset for popups.
- `containerClass` (string, optional): CSS class for the popup container.
- `childClass` (string, optional): CSS class for the popup content.
- `overlayClass` (string, optional): CSS class for the overlay.
- `animationTime` (number, optional): Animation duration in milliseconds.

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

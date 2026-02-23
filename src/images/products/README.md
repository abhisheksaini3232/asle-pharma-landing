# Product Images

Place your product images in this folder.

## Supported formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.svg`

## Recommended specifications

- Resolution: **600x600px** minimum
- Aspect ratio: **1:1** (square) or **4:3**
- File size: under **500KB** for optimal loading

## How to use

After placing your images here, update the `image` property in the products array inside  
`src/components/Products/Products.js`. Example:

```js
import product1Image from '../../images/products/your-image.png';

// Then set:
{
  id: 1,
  name: 'CardioShield Pro',
  image: product1Image,
  // ...
}
```

# Splash

The splash shows an image centered on the screen.

The splash is removed:

- after at least 2 seconds
- and when all plugins have finished loading (this depends on the async response from the plugins' [init()](TYPES.md#plugin-interface) functions)

See also [`docs/ICONS.md`](./ICONS.md) to change the icon.

/**
 * method call guard
 *
 * hmr will break the one-time initialization, add if necessary
 */
export const hmrOnce: MethodDecorator = (target, key, descriptor: PropertyDescriptor) => {
  if (!import.meta.hot) return;

  const originalMethod = descriptor.value;
  let called = false;
  descriptor.value = function (...args: any[]) {
    if (!called) {
      called = true;
      return originalMethod.apply(this, args);
    }
  };
  return descriptor;
};

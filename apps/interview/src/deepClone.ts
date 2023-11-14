/**
 * 深度克隆，使用MessageChannel实现的克隆
 */
export function deepClone(obj: object) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = (msg) => {
      resolve(msg.data);
    };
  });
}

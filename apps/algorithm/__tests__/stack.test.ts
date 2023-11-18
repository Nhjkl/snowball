import { test } from 'vitest';
import { ListNode, TLinkedNode } from '../src/linkedList';

test('stack', () => {
  /* 初始化栈 */
  // Typescript 没有内置的栈类，可以把 Array 当作栈来使用
  const stack: number[] = [];

  /* 元素入栈 */
  stack.push(1);
  stack.push(3);
  stack.push(2);
  stack.push(5);
  stack.push(4);

  /* 访问栈顶元素 */
  const peek = stack[stack.length - 1];
  console.log(`peek >>`, peek);

  /* 元素出栈 */
  const pop = stack.pop();
  console.log(`pop >>`, pop);

  /* 获取栈的长度 */
  const size = stack.length;
  console.log(`size >>`, size);

  /* 判断是否为空 */
  const is_empty = stack.length === 0;
  console.log(`is_empty >>`, is_empty);
});

test('基于链表实现的栈', () => {
  /* 基于链表实现的栈 */
  class LinkedListStack {
    private stackPeek: TLinkedNode; // 将头节点作为栈顶
    private stkSize: number = 0; // 栈的长度

    constructor() {
      this.stackPeek = null;
    }

    /* 获取栈的长度 */
    get size(): number {
      return this.stkSize;
    }

    /* 判断栈是否为空 */
    isEmpty(): boolean {
      return this.size === 0;
    }

    /* 入栈 */
    push(num: number): void {
      const node = new ListNode(num);
      node.next = this.stackPeek;
      this.stackPeek = node;
      this.stkSize++;
    }

    /* 出栈 */
    pop(): number {
      const num = this.peek();
      if (!this.stackPeek) throw new Error('栈为空');
      this.stackPeek = this.stackPeek?.next;
      this.stkSize--;
      return num;
    }

    /* 访问栈顶元素 */
    peek(): number {
      if (!this.stackPeek) throw new Error('栈为空');
      return this.stackPeek.val;
    }

    /* 将链表转化为 Array 并返回 */
    toArray(): number[] {
      const arr = new Array<number>(this.size);
      let node = this.stackPeek;
      let i = this.size - 1;
      while (i >= 0) {
        arr[i] = node!.val;
        node = node!.next;
        i--;
      }
      return arr;
    }
  }

  const res = new LinkedListStack();
  res.push(1);
  res.push(2);
  res.push(3);
  console.log(`res >>`, res);
  console.log(`res >>`, res.toArray());
});

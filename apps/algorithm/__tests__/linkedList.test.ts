import { expect, test } from 'vitest';

type TNext = ListNode | null;
/* 链表节点类 */
class ListNode {
  val: number;
  next: TNext;
  constructor(val?: number, next?: TNext) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向下一节点的引用
  }
}

/* 双向链表节点类 */
class ListNode1 {
  val: number;
  next: ListNode | null;
  prev: ListNode | null;
  constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向后继节点的引用
    this.prev = prev === undefined ? null : prev; // 指向前驱节点的引用
  }
}

console.log(`ListNode1 >>`, ListNode1);

function arr2List(arr: number[]): TNext {
  const head: ListNode = new ListNode(0);
  let current: ListNode = head;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const n1 = new ListNode(num);
    current.next = n1;
    current = n1;
  }

  return head.next;
}

test(' 初始化链表 ', () => {
  const n0 = new ListNode(1);
  const n1 = new ListNode(3);
  const n2 = new ListNode(2);
  const n3 = new ListNode(5);
  const n4 = new ListNode(4);

  n0.next = n1;
  n1.next = n2;
  n2.next = n3;
  n3.next = n4;

  function insert(n0: ListNode, P: ListNode): void {
    const n1 = n0.next;
    P.next = n1;
    n0.next = P;
  }

  const P = new ListNode(8);

  insert(n0, P);

  console.log(`P >>`, P);

  /* 删除链表的节点 n0 之后的首个节点 */
  function remove(n0: ListNode): void {
    if (!n0.next) {
      return;
    }
    // n0 -> P -> n1
    const P = n0.next;
    const n1 = P.next;
    n0.next = n1;
  }

  remove(n0);

  console.log(`n0 >>`, n0);
});

test('数组转链表', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const list = arr2List(arr);
  console.log(JSON.stringify(list));
});

test('访问链表中索引为 index 的节点', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const list = arr2List(arr);

  /* 访问链表中索引为 index 的节点 */
  function access(head: TNext, index: number): TNext {
    for (let i = 0; i < index; i++) {
      if (!head) {
        return null;
      }
      head = head.next;
    }
    return head;
  }

  const res = access(list, 3);

  console.log(`res >>`, res);

  expect(res?.val).toBe(4);
});

test('查找节点', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const list = arr2List(arr);

  /* 访问链表中索引为 index 的节点 */
  function find(head: TNext, target: number): number {
    let index: number = 0;

    while (head) {
      if (head.val === target) {
        return index;
      }
      head = head.next;
      index++;
    }

    return -1;
  }

  const res = find(list, 3);

  expect(res).toBe(2); // target 为 3, 位置在索引为 2

  expect(find(list, 10)).toBe(9);

  expect(find(list, 100)).toBe(-1);
});

export type TLinkedNode = ListNode | null;
/* 链表节点类 */
export class ListNode {
  val: number;
  next: TLinkedNode;
  constructor(val?: number, next?: TLinkedNode) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向下一节点的引用
  }
}

export class MyList {
  /* 列表类简易实现 */
  private arr: Array<number>; // 数组（存储列表元素）
  private _capacity: number = 10; // 列表容量
  private _size: number = 0; // 列表长度（即当前元素数量）
  private extendRatio: number = 2; // 每次列表扩容的倍数

  /* 构造方法 */
  constructor() {
    this.arr = new Array(this._capacity);
  }

  /* 获取列表长度（即当前元素数量）*/
  public size(): number {
    return this._size;
  }

  /* 获取列表容量 */
  public capacity(): number {
    return this._capacity;
  }

  /* 访问元素 */
  public get(index: number): number {
    if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
    return this.arr[index];
  }

  /* 更新元素 */
  public set(index: number, num: number): void {
    if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
    this.arr[index] = num;
  }

  /* 尾部添加元素 */
  public add(num: number): void {
    if (this._size === this._capacity) this.extendCapacity();
    this.arr[this._size++] = num;
  }

  /* 中间插入元素 */
  public insert(index: number, num: number): void {
    if (index < 0 || index >= this._size) throw new Error('Index out of bounds');

    if (this._size === this._capacity) this.extendCapacity();

    for (let i = this.size() - 1; i >= index; i--) {
      this.arr[i] = this.arr[i - 1];
    }

    this.arr[index] = num;

    this._size++;
  }

  /* 删除元素 */
  public remove(index: number): number {
    if (index < 0 || index >= this._size) throw new Error('Index out of bounds');

    const num = this.arr[index];

    for (let i = index; i < this.size() - 1; i++) {
      this.arr[i] = this.arr[i + 1];
    }

    this._size--;

    return num;
  }

  /* 列表扩容 */
  public extendCapacity(): void {
    // 新建一个长度为 size 的数组，并将原数组拷贝到新数组
    this.arr = this.arr.concat(new Array(this.capacity() * (this.extendRatio - 1)));
    // 更新列表容量
    this._capacity = this.arr.length;
  }

  /* 将列表转换为数组 */
  public toArray(): number[] {
    const size = this.size();
    // 仅转换有效长度范围内的列表元素
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
      arr[i] = this.get(i);
    }
    return arr;
  }
}

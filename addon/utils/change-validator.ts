import { get, set } from '@ember/object';
import { TrackedMap, tracked, TrackedArray } from 'tracked-built-ins';
import produce, { enablePatches, Patch, applyPatches } from 'immer';

enablePatches();

export default class ChangeValidator {
  @tracked public dto: Record<string, unknown>;
  @tracked public data: Record<string, unknown>;
  @tracked private declare patches: TrackedArray<Patch>;
  private errorsMap = new TrackedMap();

  constructor(data: any) {
    this.data = data;
    this.dto = data;
    this.resetPatches();
  }

  get changes() {
    return this.patches.map((p) => ({ ...p, path: p.path.join('.') }));
  }

  get isDirty() {
    return !this.isPristine;
  }

  get isPristine() {
    return this.patches.length === 0;
  }

  get errors() {
    return Object.fromEntries(this.errorsMap);
  }

  public get isInvalid() {
    return !this.isValid;
  }

  public get isValid() {
    return this.errorsMap.size === 0;
  }

  public setError(key: string, value: any) {
    this.errorsMap.set(key, value);
  }

  public removeError(key: string) {
    this.errorsMap.delete(key);
  }

  public hasError(key: string) {
    return this.errorsMap.has(key);
  }

  public removeErrors() {
    this.errorsMap.clear();
  }

  public set(key: any, value: any) {
    this.dto = produce(
      this.dto,
      (draft) => {
        set(draft, key, value);
      },
      (patches) => {
        this.patches.push(...patches);
      }
    );
  }

  public get(key: any) {
    return get(this.dto, key);
  }

  public rollback() {
    this.dto = this.data;
    this.resetPatches();
  }

  public execute() {
    this.data = applyPatches(this.data, this.patches);
    this.resetPatches();
  }

  private resetPatches() {
    this.patches = new TrackedArray();
  }
}

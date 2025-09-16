export abstract class BaseService<T> {
  protected abstract endpoint: string

  protected async request<R = T>(path: string, options?: RequestInit): Promise<R> {
    const response = await fetch(`${this.endpoint}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  abstract getAll(): Promise<T[]>
  abstract getById(id: string): Promise<T>
  abstract create(data: Partial<T>): Promise<T>
  abstract update(id: string, data: Partial<T>): Promise<T>
  abstract delete(id: string): Promise<void>
}

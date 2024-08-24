export class GmailQueryBuilder {
  private queryParts: string[] = [];

  excludeFromDomains(domains: string[]): this {
    if (domains && domains.length > 0) {
      const domainList = domains.join(' ');
      this.queryParts.push(`-from: {${domainList}}`);
    }
    return this;
  }

  includeFromDomains(domains: string[]): this {
    if (domains && domains.length > 0) {
      const domainList = domains.join(' ');
      this.queryParts.push(`from: {${domainList}}`);
    }
    return this;
  }

  excludeLabels(labels: string[]): this {
    if (labels && labels.length > 0) {
      const labelList = labels.join(' ');
      this.queryParts.push(`-label: {${labelList}}`);
    }
    return this;
  }

  includeLabels(labels: string[]): this {
    if (labels && labels.length > 0) {
      const labelList = labels.join(' ');
      this.queryParts.push(`label: {${labelList}}`);
    }
    return this;
  }

  newerThan(value: number, unit: 'd' | 'm' | 'y'): this {
    this.queryParts.push(`newer_than:${value}${unit}`);
    return this;
  }

  olderThan(value: number, unit: 'd' | 'm' | 'y'): this {
    this.queryParts.push(`older_than:${value}${unit}`);
    return this;
  }

  and(): this {
    if (this.queryParts.length > 0) {
      this.queryParts.push('AND');
    }
    return this;
  }

  or(): this {
    if (this.queryParts.length > 0) {
      this.queryParts.push('OR');
    }
    return this;
  }

  not(): this {
    if (this.queryParts.length > 0) {
      this.queryParts.push('NOT');
    }
    return this;
  }

  buildQuery(): string {
    return this.queryParts.join(' ');
  }
}

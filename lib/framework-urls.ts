import { Framework } from "@/types/framework";

export function frameworkHref(fw: Framework): string {
  return `/frameworks/${fw.slug}`;
}

export function frameworkVersionHref(fw: Framework, version: number): string {
  return `/frameworks/${fw.slug}/v${version}`;
}

export function currentVersion(fw: Framework) {
  return fw.versions.length ? fw.versions[fw.versions.length - 1] : null;
}

import React from "react";

export interface Repo1 {
  key: React.Key;
  name: string;
  url: string;
  createdAt: string;
}

export interface RepoBranch {
  key: React.Key;
  name: string;
  repoId: number;
  start: string;
  status: string;
  end: string;
}

export interface Repo {
  projectId: number;
  repoId: number;
  repoName: string;
  repoUrl: string;
  createTime: string;
}

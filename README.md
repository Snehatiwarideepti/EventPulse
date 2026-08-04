# EventPulse AI

This project is a static web app for an AI-powered event portal. It is now prepared for DevOps-based deployment using Docker, GitHub Actions CI/CD, Jenkins, and Kubernetes.

## Run locally

```bash
docker compose up --build
```

Open http://localhost:8000

## CI/CD

- GitHub Actions workflow: [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml)
- Jenkins pipeline: [Jenkinsfile](Jenkinsfile)

## Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
```

## Deployment notes

- Push this repository to GitHub.
- Enable GitHub Actions.
- For Jenkins, create a pipeline job and point it to this repository.
- For Kubernetes, build/push your image to a registry such as Docker Hub or GHCR before deploying.

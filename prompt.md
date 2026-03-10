I want you to act as a senior front-end engineer with strong experience in React, TypeScript, component libraries, and Webflow Code Components.

Your task is to help me create a Webflow Code Component that is built locally and then installed into Webflow as a reusable shared library/component, similar to an app-like workflow inside my Workspace.

Base the implementation on Webflow’s official Code Components setup and current installation workflow.

## Context
I want to:
- create a custom code component for Webflow
- develop it locally
- configure it correctly for Webflow
- expose editable props in the Designer
- publish/share it to my Webflow Workspace
- install and use it in a Webflow project/site like a reusable app/library component

## Requirements
Use:
- React
- TypeScript
- Webflow Code Components approach
- proper Webflow CLI workflow
- correct config files and package setup

Assume I want a modern, reusable, scalable setup that I can use again for future components.

## What I need from you
Please provide a complete, production-ready guide and implementation.

### 1. Explain the architecture first
Briefly explain:
- how Webflow Code Components work
- how local development works
- how the component gets registered with Webflow
- how publishing/sharing to a Workspace works
- how installation into a site works afterward

### 2. Create the full project setup
Provide:
- folder structure
- all required files
- package installation commands
- config setup
- how to initialize the project from scratch

### 3. Use the proper Webflow packages
The solution must use the correct Webflow ecosystem packages and patterns for Code Components, including:
- `@webflow/webflow-cli`
- `@webflow/data-types`
- `@webflow/react`

### 4. Include a real working component
Build a realistic example component that can be inserted into Webflow.

Use an example such as a CTA card / promo block with editable props:
- title
- description
- button label
- button URL
- theme or variant
- alignment
- optional image
- spacing option

The component should:
- be clean and reusable
- be written in React + TypeScript
- have sensible defaults
- be easy to extend later

### 5. Register it correctly for Webflow
Show exactly how to define and register the component for Webflow using the correct pattern.

This should include:
- `declareComponent`
- prop definitions
- labels/descriptions for Designer editing
- default values
- any supported control types relevant for Webflow

### 6. Include all code files in full
Output the full contents of each file, not partial snippets.

At minimum include:
- `package.json`
- `webflow.json`
- main component file(s)
- registration/index file
- any supporting type files if needed
- any basic styling approach if required

### 7. Explain local development workflow
Show:
- how to install dependencies
- how to authenticate with Webflow
- how to run locally
- how to preview/test the component
- how to handle rebuilds or updates

### 8. Explain publish/share workflow
Show:
- how to publish/share the component library to the Webflow Workspace
- how to version/update it later
- how changes propagate
- what I should expect inside Webflow

### 9. Explain installation/use inside a Webflow site
Show:
- how to install the shared library/component into a site
- how to insert it in the Designer
- how to edit props
- how content editors/designers would use it

### 10. Add best practices
Include:
- recommended project structure for multiple components
- naming conventions
- reusable prop patterns
- how to avoid tightly coupled components
- common Webflow Code Components mistakes
- troubleshooting tips

## Output format
Respond in this exact order:

1. Overview
2. Architecture explanation
3. Project structure
4. Installation and setup steps
5. Full code files
6. Local development workflow
7. Publish/share workflow
8. Install/use in Webflow
9. Best practices
10. Troubleshooting

## Important instructions
- Do not give me a generic React tutorial
- Do not skip files
- Do not give pseudo-code
- Do not use outdated Webflow/DevLink patterns
- Do not assume hidden setup steps
- Make the example realistic and reusable
- Prefer clear implementation over high-level theory
- If there are multiple valid approaches, choose the most maintainable one and explain why

## Final goal
By the end, I want to have a complete starter setup for a Webflow Code Component that I can build locally and install into Webflow as a reusable shared component/library for my Workspace.
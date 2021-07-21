# Vue3 Store Solutions Testing and Comparison

My learn-by-doing project, aim to:
(1) Learn the store solutions available to Vue 3
(2) Compare the solutions against a list of criteria
(3) Experiment some solutions to certain features and behaviors

<!-- toc -->

## The Criteria

- Sharing state between multiple components
- Loose coupling - less explicit dependency on solution 
- Encapsulation - not able to directly set state
- Getter & Method
- History and DevTool support
- Typing and static checking
- Intuitive to use
- Action state - pending, finished, failed, error, etc.
- Batched updating - buffer changes and update when commit
- Module
- Testing
- Plugin
- Work with forms


## The Application

Todo list:

- items: {uuid, title, finished}[]

Getter: all, finished, unfinished

Components:

(1) Indicator: number of unfinished items
(2) Viewer / Editor - add, update, remove, reorder



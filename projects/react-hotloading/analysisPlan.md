---
system: React Hotloading
title: Markus Petrykowski
bibliography: refs.bib
---

# Live Programming Seminar
- Your Name: Markus Petrykowski
- Your Topic: React Hotloading

Generally try to drill down on reasons behind properties of the system. Make use of the general observations about the system in arguing about specific properties or mechanisms.

## About the System itself
Summary of system properties

> Webpack - React native with activated hotloading - Webapp with reduxstate - 

### System boundaries
What have you looked at exactly? Mention the boundaries of the system and state what is included and excluded. For example, in Chrome the system might be the developer tools. This ignores any JavaScript libraries which might add additional live capabilities to the tools or to the page currently developed. Another example are auto-testing setups which span a particular editor, testing framework, and auto-testing tool.

> Browser based using react and neccesarily webpack for providing filewatching

### Context
- In which context is the system used?
    For example: Application development (coding, debugging, exploration), education, art, science (data exploration), simulation, exploration of ideas or data.
- Description of user context (professional, amateur, public presentation in front of audience, (un)known requirements, children, ...)

> Development Kontext -> HotReloading
> How does Reloading work? -> Functions have proxies to other functions that are being replaced
> Redux states for UI

### General Application Domain
- What is typically created in or through this system?
- What are users trying to accomplish with it?
    - What kind of systems are modified or developed with it (graphical application, client-server architecture, big data, streaming)?
    - ...

### Design Goals of the System
What is the design rational behind the system? Which values are supported by the system? Which parts of the system reflect this rational? For example, auto-testing setups are designed to improve productivity by improving the workflow for TDD through providing feedback on the overall system behavior during programming. Smalltalk systems are designed for expressiveness and enabling understanding through allowing users to directly access and manipulate all runtime objects in the system.

### Type of System
What is the general nature of the system? For example: interactive tool, system, library, language, execution environment, application. What makes the system part of that category?
> library  / interactive tool?
---

## Workflows
Summary of workflow observations

### Example Workflow
Description of the major workflow which illustrates all relevant "live programming" features. The workflow description should cover all major elements and interactions available. Augmented by annotated pictures and screencast.

> Immutable past <br>
> Should use hot reloading <br>
> Developer wants to make changes to the code i.e. adding a new function that gets called. Therefore application needs to be reloaded.
> to have a smoother dev-process the state of the session before should be automatically reapplied

A calculator Application, that 

### Which activities are made live by which mechanisms?

Description of each concrete activity in the workflow and the underlying liveness mechanism (which is described on a conceptual level and thus could be mapped to other systems)
- Actual interactions
- Feedback mechanism
- If applicable: How is the emergence phase shortened?
- Granularity: For example: Elm can only rerun the complete application

> Welche Kriterien für Live-Experience Relevant
> Beispiel: Ui-Patterns HCI

### Integration of live activities into overall system
Which activities in the system are not interactive anymore? Which elements can be manipulated in a live fashion and which can not?

How does this workflow integrate with other parts of the system (potentially not live)? What happens at the boundaries between live parts and non-live parts? For example, the interactively assembled GUI is later passed to a compiler which creates an executable form of the GUI.

### Limitations
To which extend can the liveness of one activity be kept up? For example, at which magnitude of data flow nodes does the propagation of values become non-immediate? At which magnitude of elapsed time can the Elm debugger not replay the application immediately anymore or when does it break down? Does an exception break the liveness?
Further, what are conceptual limitations. For example, in a bi-directional mapping system properties of single elements might be modified and reflected in the code. This might not be possible for properties of elements created in loops.

### What happens when the live parts of the system fail/break?
1. What happens when the application under development causes an exception? How does the system handle these exceptions (provide debugger, stop execution, stop rendering, ...)? Does the liveness extend to these exceptions?
2. How can the system itself break? What happens when there is a failure in the system/tool itself?

### Left out features
Which features of the system were not described and why were they left out?

---

## Models

### Mutable or immutable past
To which category does the system or parts of it belong and why?

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

### Tanimoto's Level of Live Programming
To which level of liveness do single activities belong, based on the definitions of the 2013 paper and why?

*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

### Steady Frame
Which activities are designed as steady frames based on the formal definition and how?

*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

### Impact on distances
How do the activities affect the different distances: temporal, spatial, semantic?

*D. Ungar and H. Lieberman & C. Fry Debugging and the Experience of Immediacy Communications of the ACM, ACM, 1997, 40, 38-43*

---

## Implementing Liveness

### Extend of liveness in technical artifacts
What parts of the system implements the liveness? (Execution environment, library, tool...)

---

> React through hotloading
>
> Discussion of Vanilla HMR API and using other strategies [Blog-entry | Externalize the state](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.460nwnv2i) 

Just exchanging the old components with the new ones does not preserve the state. It works like evaluating a new script tag. The old App will be discarded after this. But as react deals with stateful components these states are not transfered after the reevaluation. One solution for this problem could be the externalization of the state. Then the old as well as the new components have the same state.  React transform uses another approach to overcome this issue. It creates proxys for each of the react components to keep their state. This allows the logic to get changed easily.

Using React Hot Loading or React Transform?

Hot Loading looks at all the exports of a file and updates them whereas react transform tries to detect all existing react classes ( Those created by extending from React.component or React.createClass() or the functional declaration of react components… ) and writes proxies for them. 

Explanation why i chose one over the other? Using a general State as done with redux I would not be dependent of the internal components states. So i could easily drop the old components and replace them with the new ones.

### Implementations of single activities
Description of the implementation of live activities. Each implementation pattern should be described through its concrete incarnation in the system (including detailed and specific code or code references) and as an abstract concept.

#### Example: Scrubbing
The mouse event in the editor is captured and if the underlying AST element allows for scrubbing a slider is rendered. On changing the slider the value in the source code is adjusted, the method including the value is recompiled. After the method was compiled and installed in the class, the execution continues. When the method is executed during stepping the effects of the modified value become apparent.

Abstract form: Scrubbing is enabled through incremental compilation which enables quick recompilation of parts of an application...

---

1. State Externalization

   Vanilla Hot-Reloading (No State Preservation)

   ```javascript
   var App = require('./App')
   var React = require('react')
   var ReactDOM = require('react-dom')

   // Render the root component normally
   var rootEl = document.getElementById('root')
   ReactDOM.render(<App />, rootEl)

   // Are we in development mode?
   if (module.hot) {
     // Whenever a new version of App.js is available
     module.hot.accept('./App', function () {
       // Require the new version and render it instead
       var NextApp = require('./App')
       ReactDOM.render(<NextApp />, rootEl)
     })
   }
   ```

2. Component Proxies

3. Overwriting React.createElement function to easily proxy existing react components ( Based on idea that everything that is a react component will be passed to React.createElement )

   ```javascript
   import createProxy from 'react-proxy'

   let proxies = {}
   const UNIQUE_ID_KEY = '__uniqueId'

   export function register(uniqueId, type) {
     Object.defineProperty(type, UNIQUE_ID_KEY, {
       value: uniqueId,
       enumerable: false,
       configurable: false
     })
     
     let proxy = proxies[uniqueId]
     if (proxy) {
       proxy.update(type)
     } else {
       proxy = proxies[id] = createProxy(type)
     }
   }

   // Resolve when elements are created, not during type definition!
   const realCreateElement = React.createElement
   React.createElement = function createElement(type, ...args)  {
     if (type[UNIQUE_ID_KEY]) {
       type = proxies[type[UNIQUE_ID_KEY]].get()
     }
     
     return realCreateElement(type, ...args)
   }
   ```

   Components will then look like this:

   ```javascript
   class Counter extends Component {
     constructor(props) {
       super(props)
       this.state = { counter: 0 }
       this.handleClick = this.handleClick.bind(this)
     }
     handleClick() {
       this.setState({
         counter: this.state.counter + 1
       })
     }
     render() {
       return (
         <div className={this.props.sheet.container} onClick={this.handleClick}>
           {this.state.counter}
         </div>
       )
     }
   }

   const styles = {
     container: { 
       backgroundColor: 'yellow'
     }
   }

   const __exports_default = useSheet(styles)(Counter)
   export default __exports_default

   // generated:
   // register anything that *remotely* looks like a React component
   register('Counter.js#Counter', Counter)
   register('Counter.js#exports#default', __exports_default) // every export too
   ```

   A Babel plugin creates the register calls to get every potential react component ( Here the Counter Component as well as the existing exports too.)

### Within or outside of the application

For each activity: Does the activity happen from within the running application or is it made possible from something outside of the application? For example, a REPL works within a running process while the interactions with an auto test runner are based on re-running the application from the outside without any interactive access to process internal data.

---

## Benchmark
1. **Unit of change:** Determine relevant units of change from the user perspective. Use the most common ones.
2. **Relevant operations:** Determine relevant operations on these units of change (add, modify, delete, compound operations (for example refactorings)).
3. **Example data:** Select, describe, and provide representative code samples which reflect the complexity or length of a common unit of change of the environment. The sample should also work in combination with any emergence mechanisms of the environment, for example a replay system works well for a system with user inputs and does not match a long-running computation.
4. **Reproducible setup of system and benchmark**
5. Description of installation on Ubuntu 16.04.1 LTS
6. Description of instrumentation of system for measurements: The measurements should be taken as if a user was actually using a system. So the starting point of a measurement might be the keyboard event of the save keyboard shortcut or the event handler of a save button. At the same time the emergence phase ends when the rendering has finished and the result is perceivable. The run should include all activities which would be triggered when a developer saves a unit of change (for example regarding logging or persisting changes).
7. **Results for adaptation and emergence phase**

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

---

> Adaptation Phase duration (save bis änderung zum Browser Propagiert (bis proxies umgemappt wurden))
> Emergence Phase (Änderung im Browser angekommen (Proxies umgemappt) & reapplying changes im browser)

---

## Personal observations
Everything that is particular about the environment and does not fit into the pre-defined categories mentioned so far.

## Style Template
- Denote headings with #
- You can use any text highlighting, list types, and tables
- Insert images in the following way:
  `![This is the caption](/url/of/image.png)`
- Insert videos or web resources as markdown links
- Insert references as: `@RefKey` and supply a bib file
- No HTML tags please

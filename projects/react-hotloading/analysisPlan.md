---
system: React Hotloading
title: Markus Petrykowski
bibliography: refs.bib
---

# Live Programming Seminar
- Your Name: Markus Petrykowski
- Your Topic: React Hotloading

## About the System itself
The System is a webapplication, which is bundled by Webpack. Apart from React [REF to React] , Redux[REF to REDUX] is used to take care of the systems state. Webpack plays an important Role for the liveness of this setup because it provides the ability to notify the application for changed files.

React.js is a javascript framework that allows to develop a webapplication in a component like manor. More concretly your application gets split up into multiple components such as a button, a modal or a form. Each of those components can use other components, which leads to a component tree. Redux on the other hand takes care of the internal state of a application and handles the business logic. Components react to the state by subscribing to certain parts of it.

### System boundaries
The focus in general has been the replacement of changed code within the running application as well as the possibility to interact with the running system. React and Redux need to be analysed differently here because both allow different kind of interactions.

#### React

Within the context of React code replacement more specifically means to swap Components without losing their local state. The component reload is limited to the files imported from the main react app file.

#### Redux

Redux on the other hand allows some more interactions with the running system. Of course you would like to be able to change code and get it patched within the running application. But Redux further more enables the developer to interact with the Redux-System through a Developer Tool. It supports a few features such as:

- Seeing the history of actions that have been dispatched
- Disabling / Enabling certain actions
- Dispatching own actions
- Inspecting the state that emerged through everey action
- Traveling through the dispatched actions

As the application appearance is also based on the state, it shows direct feedback of the interaction with the Developer Tool. The code-patching for Redux is also limited to all the files that are imported by the main reducer. 

#### Webpack

Webpack is a developer tool that bundles and minimizes the application files. Furthermore, it composes loaders for different file types. One crucial part of Webpack that plays the most important part within this setup is its Hot Module Replacement (HMR) ability. This module watches the bundled files for changes and provides a web socket for the webapplication. This socket allows the webappllication to reload certain files when changes to them were made.

#### Visual Code

Apart from the Frameworks and tools used to provide the application, the editor is necessary too. It empowers the developer to perform the changes to the files. In this particular case we used Visual Code for Mac that was developed by Microsoft. However, this editor could have been replaced with Atom, Sublime or any other text-editor without any further adaptions.

### Context

React and Redux are mainly used in **commercial software development** for **web applications**. React has recently experienced a lot of traction which led to its further use in **mobile development** (React Native) or **Virtual Reality** (React VR). As Redux and React are independent of each other Redux can be applied in the contexts of React, but also in any other Javascript contexts. This setup is used by professional developers, no matter which amount of experience they have. Some people also use this setup to prepare presentations, which allows them to have integrated interactivity. But this does not reflect the main purpose of the system. The live activities within the context of React, Redux and Webpack are only **used in development mode**, not for production.

### General Application Domain
React and Redux are Frameworks written in javascript. Especially React is used to build interactive Web-Applications. As todays usage of web-apps has become more immersive, the programs became more complex too. Therefore React was designed in order to manange such comprehensive user interfaces. A few users of React are Facebook, Netflix or Airbnb [(See more)](https://github.com/facebook/react/wiki/sites-using-react). Redux is often used within React-Applications to manage the state but due to its popularity it is also used within other environments than React. 

Apart from Web-Applications, the concept of the virtual DOM within React has also become interesting for other areas. This resulted in a Framework called React-Native to build platform-independent mobile applications. Further more a React-based framework for virtual reality did also emerge.

Regarding Redux, it has become popular due to different advantages it comes with. A single state allows an easy startup, with an already existing state. Further more a serialization of the state can help to easily find flaws within the data-flow and it also enables informative bug-reports. 

### Design Goals of the System
React allows to easily split up your application into components. Each of those components has a local state in which it operates. Those design pattern encourages a clean code structure where each component has a dedicated purpose.

Redux was designed with three principles in mind [REF to design Goals]:

- Single Source of truth
- State is Read Only
- Changes are made with Pure Functions

The single source of truth refers to the single state that exists and that defines the application. In order to rely on the state to be correct and to not be influenced by any foreign influences the state is read only. The only way to be able to change the state is through pure functions. That means that any of those functions must not have any side effects and do not modify the existing state. This supports the overall goal to have a single state that describes the whole application.

### Type of System
React and Redux are both Javascript frameworks to support the development of interactive and complex web user interfaces. They provide the developers with patterns and interfaces to compose sophisticated web applications.

Webpack is a tool that bundles application files into one file, such as all Javascript files into one main.js file. It enables developers to easily minimize their applications to enable a faster application startup. 

The developer tools to interact with the redux store are as the name already reveals a tool. They enable an inspection of the state as well as a history of the actions. Furthermore it also provides an API for developers to integrate own Redux tools. 

---

## Workflows
Summary of workflow observations

### Example Workflow
![prev](/Users/Markus/Development/live-programming-systems/projects/react-hotloading/assets/prev.png)

A basic example is extending an already existing App. In this case it is a calculator that misses the multiplication operation and has a wrong implementation for the addition. This extension will be implemented without any reload in the browser, as the app only reloads the changed files through Webpack Hot Module Replacement.

1. Start the application with ```npm install``` and ```npm start``` afterwards from within the repositories code file

2. Open your browser and visit [localhost:8000](http://localhost:8000)

3. Open the file Keypad.jsx and add the following line to the render method as a child to the div with the class 'operators'

   ```jsx
   <div className="button" onClick={() => onClick('×')}>
     <div className="content">×</div>
   </div>
   ```

4. After saving the file the browser will immediatly show the new button

5. Now enter the equation ```12+3``` as you would normally do with a calculator. The result will be 9, which is obviously wrong. So lets fix it.

6. First of all lets have a look at the Redux developer tools to analyse what went wrong. Therefore have  a look at the last called ```EVALUATE``` action. 

   ![workflow_1](/Users/Markus/Development/live-programming-systems/projects/react-hotloading/assets/workflow_1.png)

   1. The action consists of a type and a payload. The payload consists of an equation. This should reflect the equation that is shown at the top of the calculator
   2. Apart from the action you can also see the state change there. The result should be **15**, but is **9** instead. This indicates a wrong implementation within our reducer, that is responsible for the calculation.

7. Open the file reducers/index.js 

8. This file contains a function called result, which takes the current state and the dispatched action and generates the new state for the result. As we can see it covers the case for the ```EVALUATION``` action and passes the equation to the solve function, which solves the function by going from left to right and calculating the left two numbers together.

9. The actual calculation happens within the simple solve function, which implements it for the +, - and ÷ operator. As we see within the file, the + operator actually performs a minus-operation.

10. Correct the **case '+'** to perform an addition and save the file.

11. Now you should directly see the applied change in your browser. The result is now 15 instead of 9.

12. Now lets implement the multiplying operator. 

13. Commit your current app state with the redux developer tool in the upper right corner. 

14. All your dispatched actions are now squashed together to one state. 

15. We commit the actions because we are not interested into the old actions anymore.

16. Extend the function by multiplying by 4. Your display at the top should now show the equation ```12+3×4```

17. But the calculator does not show a result anymore. So we need to implement the functionality for the new operator. 

18. Add the case for the multiplication in the simpleSolve-method. It should like this

```javascript
   function simpleSolve(op1, op2, operation){
     switch(operation){
       case '+':
         return op1 + op2
       case '-':
         return op1 - op2
       case '×':
         return op1 * op2
       case '÷':
         return op1 / op2
       default:
         return ''
     }
   }
```

17. After saving the file, the calculator should have replayed the dispatched actions and shows the correct result.

### Which activities are made live by which mechanisms?

There are three steps within the workflow that make use of the live-mechanisms. The first live-mechanism is triggered on adding a new operator to the Keypad component (Step 3,4). Changes within components are detected immediatly and get propagated to the browser through the Webpack Hot Module Replacement. Afterwards the React Hot-Loader reintegrates the changed component. All the changes happen at the scope of components, which means that even if only a method was changed the whole component gets propagated and reintgrated.

The React-Hot Loader further more follows an approach that shortens the emergence-phase. It uses proxies for each component that allows it to only rerender the changed component. Otherwise the whole application would have been rerendered ( See section 'Implementing Liveness' for more detail ).

When changes are made to a reducer, as done in the workflow above within the operator implementation in step 10 and 16, the second and third live-mechanism takes place. The change of the file also triggers the Webpack Hot-Modul-Replacement Mechanism. But this time, after the code was delivered to the browser, the current redux state gets applied with the new reducer code and generates the new state. To accomplish this task, all the previously dispatched actions are reexecuted. 

As there does not exist a concrete mapping between actions and reducers, the Redux framework has knowledge of, it is not possible to shorten the emergence phase by starting at the first action that really might make a difference to the state.

### Integration of live activities into overall system
The live activities in this workflow are only for development mode. In this example Hot-Reloading was used for the reducer code, as well as for the React-Application code. Therefore, every other file that directly belongs to the application, no matter whether it existed during the application loading process or not, will be affected by the Hot-Reloading.

One limitation that comes with Redux affects the state of the application, which is defined by actions. The devtools allow to disable actions and to dispatch new ones, but you cannot explicitly change a certain action. Nevertheless, there are possibilities that can accomplish the same result as replacing a specific action. One could just disable all actions and afterwards dispatch the same actions, except the one that needed a change, again. 

### Limitations
For both frameworks the adaptation time stays quite the same. 

According to React the emergence time can vary a bit, depending on the amount of changes done in one file, which may contain multiple or even one larger component. However, large component files do not  go along with React's design goals, because this could lead to large scale replacements.

That is slightly different in Redux, where the emergence time grows linear with the number of actions, that are reapplied. A large number of actions might therefore trigger a hot reload that does not feel live anymore. Although, it is possible to create such situations it is not intendend. Since the developer usually wants to see whether a certain part of the code works, he is able to commit a specific state and can see the changes from this state on. The commit squashes all the performed actions to this state and drops the actions.

Another limitation that comes with Redux are the actions that can be dispatched through the developer tool. The user is restricted to the available actions. If the action does not exist, it will not have any impact on the state. However, it is possible to dispatch an action first and add the implementation for this action afterwards. Direct changes to the state are not possible though. This would break one of redux's design principle mentioned earlier.

### What happens when the live parts of the system fail/break?
There are mainly 2 different kind of exceptions that can occur. The ones that occur during build time and the ones that occur during runtime. 

Although Javascript does not need to be compiled, the written code nevertheless gets translated. A module called Babel translates the ES6 code to browser compliant Javascript and uses polyfills whereever necessary. Polyfills are libraries that provide functionality for browsers that are not yet implemented by them. So every mistake that gets detected during this phase does not break the application. Those errors possibly occur when files are changed. The browser shows the wrong part of the application and stops rendering the appliacation. During this error state the application and the code are getting out of sync, as long as the developer has not fixed the the error. This error detection is made by Webpack.

But if it comes to the execution of wrong code, for example accessing variables or attributes that do not exist the application breaks and needs to be reloaded in order to get the liveness back. This leads to a loss of the states. 

### Left out features

The main features regarding the liveness aspect of React and Redux where covered. However the Redux dev tools provide some more features, like seeing the state diffs for each action or a time traveling function, that can help the developer to understand the impact of some actions. But those are not very important though. Furthermore, Redux devtools provide an interface to easily add more features if a developer needs certain other knowledges of the state or functionalities to modify it.

---

## Models

### Mutable or immutable past
According to [1] an environment with mutable past "replays the application. To achieve this they have previously recorded any input events and replay them at appropriate moments.". According to this definition Redux has a mutable past. It keeps the events which are called actions in Redux and **reapplies them every time, the reducers were changed**. 

Whereas React has an immutable past. If it is not used together with Redux each component has its own local state. After replacing a component it still has its state, but it can not have any influence on its past.

### Tanimoto's Level of Live Programming
Tanimoto [2] defines the liveness level 4 as a System that is "continually active […] and the system is responsive as in the thrid level". Referring to Redux and React the application is continually active and also responsive. That means that changes of the code lead to new computations of the application. Thats what is being accomplished by the hot-replacement.

Another important aspect is that it does not feel like the application has been restarted. This would have been the case, if the state gets resetted after each hot-replacement. It would convey the impression to the developer that the application has been restarted, because the state of the application would have been lost.

### Steady Frame
One important aspect of the Steady Frame is that "continuous feedback only makes sense in response to a continuous action" [3]. So does a developer really provide continuous action in the described setup? The process of coding can be seen as such a continuity. Coding does involve a lot of changes, also to different files. One additional aspect regarding the fastness of this continous process comes with the interpretable nature of javascript. As it does not need any compiling, the code can directly be passed to the browser and be applied.

As we deal with continuous actions, the feedback represented through the application and the devtools has furthermore to be constantly meaningful and constantly present. The presence is represented by the application itself which provides the feedback to the developer. Additionaly, the application is also constantly meaningful, as the new changes propagate quickly to the browser. Therefore the application represents the written code allmost the whole lifetime.

### Impact on distances
Ungar and Liebermann describe different modes of immediacy [4], temporal, spatial and semantic.

Looking at temporal Immediacy they mention not only forward immediacy which describes the delay between a saved change and its impact but also backwards immediacy. Forward immediacy in the above setup is short enough to make it feel live. But looking at backwards immediacy neither React nor Redux does provide it. 

Spatial distance is highly dependent to the developers setup. A developer can use React and Redux as well with a high spatial distance as well as with a small distance. Which means that the browser where the application runs in can be on the same display, but can also be on a more distant display where the developer needs to walk to. Therefore, the setup does not imply a fixed distance. Nevertheless a better liveness requires a shorter spatial distance.

According to semantic distance both React and Redux have a **small immediacy**. The nature of React lays in being designed in components. Those components are directly reflected by the application. Ideally, each small part within the UI is represented by a single component within the code. Redux is quite similar as the state defines the appearence of the UI. This regards to certain values that are displayed, as well as to certain views that are selected. Furthermore the developer is able to see the actions that caused a certain change within the state. 

---

## Implementing Liveness

The setup of the following implementations are from a blogpost by Dan Abramov. [5]

### Extend of liveness in technical artifacts

One important part that enables the liveness of both React and Redux is the Webpack-Hot-Module-Replacement (HMR). It serves the files as well as watches them for changes and provides notifications for file-changes. Both Redux and React are observing those file changes and reacting appropriate.

### Implementations of single activities
#### Example: Changing a React Component
First of all the file change gets registered by the Webpack HMR module. Than a module called react-hot-loader which is a webpack loader registers for file changes and reintegrates them appropriatly.

A simple replacement looks like this:

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
The app registers itself for changes at file ```./Path```. So everytime this file, or a file that is imported by it, the callback is triggered and causes a replacement of the React app. The problem that comes with this approach is, that all the local states of the existing components get lost if the new app just gets evaluated.

Therefore, react-hot-loader follows the approach to detect all existing React components and creates a proxy for them. So if a certain component has changed it gets replaced behind its proxy. Therefore, the state is kept by the proxy. The proxy itself is a component as well. It calls lifecycle method of the actual component. This approach makes it possible to replace the proxied components without bigger efforts.

The hard part at this point is to determine which instances are actually React components. This is problem is solved by identifying every candidate for a component. That can either be every created class within a .jsx file but also everything that is exported. To make sure to get every React component the hot-loader registers every candidate internally.

```jsx
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

For every registered component the createElement method is overwritten. So every real component will call this method and will then be propagated to the real method after being attached to a proxy.

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

Those proxies allow to easily exchange modified components while keeping their state.

#### Example: Changing a Reducer

When a developer changes the code of a reducer he wants to see the implemented changes directly with the already existing state within the application. This feature is implemented by the Redux devtools. Similar to the react-hot loading the application has to attach to the Webpack HMR at first. (see ```src/js/main.jsx``` for the whole file)

```javascript
[...]

// Are we in development mode?
if (module.hot) {
  // Whenever a new reducer is available
  module.hot.accept('./reducers', function () {
  	const nextReducer = require('./reducers/index').default;
  	store.replaceReducer(nextReducer);
  })
}
[...]
```

The whole process of reapplying the new state happens within the replaceReducer function. Simply said it iterates over all of the stored actions and performs them again with the new reducers. 

### Within or outside of the application

Regarding both examples the liveness is made possible through outside of the application. The application listens to the Webpack HMR server that notifies the application everytime a new file is available. If the application has subscribed to this notification a callback will be triggered. This callbacks are handled as in the examples above. The whole process does not happen within the application itself.

In comparison the devtools impact from within the application. They are part of it and provide an interface to the user to change the state of the application.

---

## Benchmark
1. **Unit of change:** As described in the workflow above there are 2 Units of change. First changing a React component and second changing a Redux reducer. Two important units reagarding the workflow and impacting the liveness are the **number of actions** dispatched and the **number of components** that were changed. 

2. **Relevant operations:** The most common operation would be a Modification of the units. Of course deletes and additions also occur, but have the same effect.

3. **Example data:** The changes made are mostly small changes to correct wrong system behavior. Regarding Redux this means to change a reducer to perform another reduction than he has done before. And to see the impact of already existing actions the benchmark should also cover different numbers of actions. According to React its relevant to look at how long the setup needs to reintegrate a modified component. As the components are usually seperated by files, changes will be made to only one component at once. Therefore the benchmark will cover this main case.

4. **Reproducible setup of system and benchmark**

5. Description of installation on Mac OS Sierra 10.12.2

   1. First start the application
   2. Therfore go to the code folder and execute ``npm install`` and afterwards ```npm start```
   3. Next go to the benchmarking folder with ```cd benchmarking```
   4. Execute the script ```prepare_benchmarks.sh```. It prepares two files to make it possible to track the emergence phases
   5. Now open Google Chrome, go to [localhost:8000](http://localhost:8000) and open the developer console.
   6. Now make sure that the benchmark arrays are empty by executing the following commands within the console

   ```javascript
   window.reduxBM = [] // Stores the time to emerge for redux 
   window.reactBM = [] // Stores the time to emerge for react
   window.hmrBM = []   // Stores the time Webpack need for adaptation
   ```

   7. Now you can execute either ```react_bm.sh``` or ```redux_bm.sh```. Both scripts either change a react component or a reducer for a number of times.
   8. After the scripts finished the values for the elapsed time are in the variables mentioned above.
   9. For Redux you might also want to dispatch some actions first by simply using the interface. This allows you to see the affect of a different number of dispatched actions.

6. Description of instrumentation of system for measurements: 

   - To measure the adaptation phase for a reducer change, the time is measured that it takes to replay the already dispatched actions within the webpack callback. For a change of a component the time is measured it takes to rerender it to determine its emergence time. React has to lifecylcle methods in its component that get called before and after the rendering. To name them the constructor of the Keypad-Component is called before rendering and the componentDidMount method after the rendering. The emergence time in both, react and redux, phases is extracted from the Webpack HMR module. The specifictions of the systems are:
     - React, Redux and dependencies are definied in the package.json file
     - Google Chrome:  Version 55.0.2883.95 (64-bit)
   - Each Benchmark was performed with 1000 runs

7. **Results for adaptation and emergence phase**

   The Bars in the following graphs show the 2nd and 3rd quartile of the results.

![Redux - Adaptation](/Users/Markus/Development/live-programming-systems/projects/react-hotloading/assets/Redux - Adaptation.png)

> Standard-Deviation: 131ms, 105ms, 198ms
>
> Mean: 439ms , 401ms, 445ms
>
> Median: 398ms, 371ms, 376ms

![Redux - Emergence](/Users/Markus/Development/live-programming-systems/projects/react-hotloading/assets/Redux - Emergence.png)

> Standard-Deviation: 3ms, 46ms, 139ms
>
> Mean: 12ms , 202ms, 424ms
>
> Median: 11ms,  190ms, 387ms

![React-Boxplot](/Users/Markus/Development/live-programming-systems/projects/react-hotloading/assets/React-Boxplot.png)

> Standard-Deviation: 358ms, 6ms
>
> Mean: 779ms, 19ms
>
> Median: 625ms, 19ms

The results above show a different outcome within the adaptation time, especially in comparison of Redux and React,  which can only be reasoned by a different workload of the execution machine. 

The Emergence time for Redux show that the time grows linearily with the number of already dispatched actions. In comparison to the former emergence time React executes faster. A reason for that could be the highly optimized algorithm for rerendering components in React. Further more the rerendering only depends on the one reloaded component, because only one component can be changed at the same time. 


# Sources

[1] *P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

[2]*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

[3]*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

[4] *D. Ungar and H. Lieberman & C. Fry Debugging and the Experience of Immediacy Communications of the ACM, ACM, 1997, 40, 38-43*

[5] D. Abramov, Hot Reloading in React,"https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.n06mj1ps8", 2016, accessed 15-February-2017
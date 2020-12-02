declare namespace CodeceptJS {
    interface ActorStatic {
        /**
         * add print comment method`
         */
        say(msg: string, color?: string): Promise<any> | undefined;
        retry(opts: any): this;
    }
    /**
     * Create CodeceptJS runner.
     * Config and options should be passed
     */
    class Codecept {
        constructor(config: any, opts: any);
        /**
         * Require modules before codeceptjs running
         */
        requireModules(requiringModules: string[]): void;
        /**
         * Initialize CodeceptJS at specific directory.
         * If async initialization is required, pass callback as second parameter.
         */
        init(dir: string): void;
        /**
         * Creates global variables
         */
        initGlobals(dir: string): void;
        /**
         * Executes hooks.
         */
        runHooks(): void;
        /**
         * Executes bootstrap.
         */
        bootstrap(): void;
        /**
         * Executes teardown.
         */
        teardown(): void;
        /**
         * Loads tests by pattern or by config.tests
         */
        loadTests(pattern?: string): void;
        /**
         * Run a specific test or all loaded tests.
         */
        run(test?: string): void;
    }
    /**
     * Current configuration
     */
    class Config {
        /**
         * Create a config with default options
         */
        static create(newConfig: any): {
            [key: string]: any;
        };
        /**
         * Load config from a file.
         * If js file provided: require it and get .config key
         * If json file provided: load and parse JSON
         * If directory provided:
         * * try to load `codecept.conf.js` from it
         * * try to load `codecept.json` from it
         * If none of above: fail.
         */
        static load(configFile: string): any;
        /**
         * Get current config.
         */
        static get(key: string, val: any): any;
        /**
         * Appends values to current config
         */
        static append(additionalConfig: {
            [key: string]: any;
        }): {
            [key: string]: any;
        };
        /**
         * Resets config to default
         */
        static reset(): {
            [key: string]: any;
        };
    }
    /**
     * Dependency Injection Container
     */
    class Container {
        /**
         * Create container with all required helpers and support objects
         */
        static create(config: any, opts: any): void;
        /**
         * Get all plugins
         */
        static plugins(name?: string): any;
        /**
         * Get all support objects or get support object by name
         */
        static support(name?: string): any;
        /**
         * Get all helpers or get a helper by name
         */
        static helpers(name?: string): any;
        /**
         * Get translation
         */
        static translation(): void;
        /**
         * Get Mocha instance
         */
        static mocha(): any;
        /**
         * Append new services to container
         */
        static append(newContainer: {
            [key: string]: any;
        }): void;
        /**
         * Clear container
         */
        static clear(newHelpers: {
            [key: string]: any;
        }, newSupport: {
            [key: string]: any;
        }, newPlugins: {
            [key: string]: any;
        }): void;
        /**
         * Share data across worker threads
         * @param options - set {local: true} to not share among workers
         */
        static share(data: any, options: any): void;
    }
    /**
     * Method collect own property and prototype
     */
    function getObjectMethods(): void;
    /**
     * Datatable class to provide data driven testing
     */
    class DataTable {
        constructor(array: any[]);
        add(array: any[]): void;
        xadd(array: any[]): void;
        filter(func: (...params: any[]) => any): void;
    }
    namespace event {
        const dispatcher: NodeJS.EventEmitter;
        const test: {
            started: 'test.start';
            before: 'test.before';
            after: 'test.after';
            passed: 'test.passed';
            failed: 'test.failed';
            finished: 'test.finish';
            skipped: 'test.skipped';
        };
        const suite: {
            before: 'suite.before';
            after: 'suite.after';
        };
        const hook: {
            started: 'hook.start';
            passed: 'hook.passed';
        };
        const step: {
            started: 'step.start';
            before: 'step.before';
            after: 'step.after';
            passed: 'step.passed';
            failed: 'step.failed';
            finished: 'step.finish';
            comment: 'step.comment';
        };
        const bddStep: {
            before: 'suite.before';
            after: 'suite.after';
        };
        const all: {
            before: 'global.before';
            after: 'global.after';
            result: 'global.result';
        };
        const multiple: {
            before: 'multiple.before';
            after: 'multiple.after';
        };
        const workers: {
            before: 'workers.before';
            after: 'workers.after';
        };
        function emit(event: string, param: any): void;
        /**
         * for testing only!
         */
        function cleanDispatcher(): void;
    }
    namespace browserCodecept {
        /**
         * all found elements are stored here for reuse
         */
        var elements: Node[];
        /**
         * global context changer
         */
        var within: Node;
        /**
         * finders
         */
        function fetchElement(id: number): Node;
        function findAndStoreElements(by: string, locator: CodeceptJS.ILocator, contextEl?: any): number[];
        function findAndStoreElement(by: string, locator: CodeceptJS.ILocator, contextEl?: any): number | undefined;
        function setWithin(by: string, locator: CodeceptJS.ILocator): void;
        function findElements(by: string, locator: CodeceptJS.ILocator, contextEl?: any): Node[];
        function findElement(by: string, locator: CodeceptJS.ILocator, context?: any): Node;
        function clickEl(el: number): boolean;
        function doubleClickEl(el: number): void;
        function hoverEl(el: number, x: number | undefined, y: number | undefined): void;
        function rightClickEl(el: number): void;
        function checkEl(el: number): boolean | undefined;
        function unCheckEl(el: number): boolean;
    }
    /**
     * Index file for loading CodeceptJS programmatically.
     *
     * Includes Public API objects
     */
    namespace index {
        var codecept: typeof CodeceptJS.Codecept;
        var Codecept: typeof CodeceptJS.Codecept;
        var output: typeof CodeceptJS.output;
        var container: typeof CodeceptJS.Container;
        var event: typeof CodeceptJS.event;
        var recorder: CodeceptJS.recorder;
        var config: typeof CodeceptJS.Config;
        var actor: CodeceptJS.actor;
        var helper: typeof CodeceptJS.Helper;
        var Helper: typeof CodeceptJS.Helper;
        var pause: typeof CodeceptJS.pause;
        var within: typeof CodeceptJS.within;
        var dataTable: typeof CodeceptJS.DataTable;
        var store: typeof CodeceptJS.store;
        var locator: typeof CodeceptJS.Locator;
    }
    function addStep(step: any, fn: any): void;
    class FeatureConfig {
        /**
         * Retry this suite for x times
         */
        retry(retries: number): this;
        /**
         * Set timeout for this suite
         */
        timeout(timeout: number): this;
        /**
         * Configures a helper.
         * Helper name can be omitted and values will be applied to first helper.
         */
        config(helper: string | {
            [key: string]: any;
        }, obj?: {
            [key: string]: any;
        }): this;
        /**
         * Append a tag name to scenario title
         */
        tag(tagName: string): this;
    }
    class ScenarioConfig {
        /**
         * Declares that test throws error.
         * Can pass an Error object or regex matching expected message.
         */
        throws(err: any): this;
        /**
         * Declares that test should fail.
         * If test passes - throws an error.
         * Can pass an Error object or regex matching expected message.
         */
        fails(): this;
        /**
         * Retry this test for x times
         */
        retry(retries: number): this;
        /**
         * Set timeout for this test
         */
        timeout(timeout: number): this;
        /**
         * Pass in additional objects to inject into test
         */
        inject(obj: {
            [key: string]: any;
        }): this;
        /**
         * Configures a helper.
         * Helper name can be omitted and values will be applied to first helper.
         */
        config(helper: string | {
            [key: string]: any;
        }, obj?: {
            [key: string]: any;
        }): this;
        /**
         * Append a tag name to scenario title
         */
        tag(tagName: string): this;
        /**
         * Dynamically injects dependencies, see https://codecept.io/pageobjects/#dynamic-injection
         */
        injectDependencies(dependencies: {
            [key: string]: any;
        }): this;
    }
    class Locator {
        constructor(locator: CodeceptJS.LocatorOrString, defaultType?: string);
        toString(): string;
        toXPath(): string;
        or(locator: CodeceptJS.LocatorOrString): Locator;
        find(locator: CodeceptJS.LocatorOrString): Locator;
        withChild(locator: CodeceptJS.LocatorOrString): Locator;
        withDescendant(locator: CodeceptJS.LocatorOrString): Locator;
        at(position: number): Locator;
        first(): Locator;
        last(): Locator;
        withText(text: string): Locator;
        withAttr(attrs: {
            [key: string]: string;
        }): Locator;
        as(output: string): Locator;
        inside(locator: CodeceptJS.LocatorOrString): Locator;
        after(locator: CodeceptJS.LocatorOrString): Locator;
        before(locator: CodeceptJS.LocatorOrString): Locator;
        static build(locator: CodeceptJS.LocatorOrString): Locator;
    }
    namespace output {
        var stepShift: number;
        /**
         * Set or return current verbosity level
         */
        function level(level: number): number;
        /**
         * Print information for a process
         * Used in multiple-run
         */
        function process(process: string): string;
        /**
         * Print information in --debug mode
         */
        function debug(msg: string): void;
        /**
         * Print information in --verbose mode
         */
        function log(msg: string): void;
        /**
         * Print error
         */
        function error(msg: string): void;
        /**
         * Print a successful message
         */
        function success(msg: string): void;
        function plugin(name: string, msg: string): void;
        /**
         * Print a step
         */
        function step(step: CodeceptJS.Step): void;
        namespace suite {
            function started(suite: Mocha.Suite): void;
        }
        namespace test {
            function started(test: Mocha.Test): void;
            function passed(test: Mocha.Test): void;
            function failed(test: Mocha.Test): void;
            function skipped(test: Mocha.Test): void;
        }
        namespace scenario {
            function passed(test: Mocha.Test): void;
            function failed(test: Mocha.Test): void;
        }
        /**
         * Print a text in console log
         */
        function say(message: string, color?: string): void;
        function result(passed: number, failed: number, skipped: number, duration: number | string): void;
    }
    /**
     * Pauses test execution and starts interactive shell
     */
    function pause(): void;
    /**
     * Singleton object to record all test steps as promises and run them in chain.
     */
    interface recorder {
        retries: {
            [key: string]: any;
        }[];
        /**
         * Start recording promises
         */
        start(): void;
        isRunning(): boolean;
        startUnlessRunning(): void;
        /**
         * Add error handler to catch rejected promises
         */
        errHandler(fn: (...params: any[]) => any): void;
        /**
         * Stops current promise chain, calls `catch`.
         * Resets recorder to initial state.
         */
        reset(): void;
        session: CodeceptJS.RecorderSession;
        /**
         * Adds a promise to a chain.
         * Promise description should be passed as first parameter.
         * @param [retry] - undefined: `add(fn)` -> `false` and `add('step',fn)` -> `true`
         *     true: it will retries if `retryOpts` set.
         *     false: ignore `retryOpts` and won't retry.
         */
        add(taskName: string | ((...params: any[]) => any), fn?: (...params: any[]) => any, force?: boolean, retry?: boolean): Promise<any> | undefined;
        retry(opts: any): any;
        catch(customErrFn?: (...params: any[]) => any): Promise<any>;
        catchWithoutStop(customErrFn: (...params: any[]) => any): Promise<any>;
        /**
         * Adds a promise which throws an error into a chain
         */
        throw(err: any): void;
        saveFirstAsyncError(err: any): void;
        getAsyncErr(): any;
        cleanAsyncErr(): void;
        /**
         * Stops recording promises
         */
        stop(): void;
        /**
         * Get latest promise in chain.
         */
        promise(): Promise<any>;
        /**
         * Get a list of all chained tasks
         */
        scheduled(): string;
        /**
         * Get a state of current queue and tasks
         */
        toString(): string;
    }
    interface RecorderSession {
        running: boolean;
        start(name: string): void;
        restore(name: string): void;
        catch(fn: (...params: any[]) => any): void;
    }
    class Secret {
        constructor(secret: string);
        toString(): string;
        static secret(secret: any): Secret;
    }
    function session(sessionName: CodeceptJS.LocatorOrString, config: ((...params: any[]) => any) | {
        [key: string]: any;
    }, fn?: (...params: any[]) => any): Promise<any> | undefined;
    class Step {
        constructor(helper: CodeceptJS.Helper, name: string);
        actor: string;
        helper: CodeceptJS.Helper;
        name: string;
        helperMethod: string;
        status: string;
        suffix: string;
        prefix: string;
        comment: string;
        args: any[];
        metaStep: MetaStep;
        stack: string;
        setTrace(): void;
        setArguments(args: any[]): void;
        run(...args: any[]): any;
        setStatus(status: string): void;
        humanize(): string;
        humanizeArgs(): string;
        line(): string;
        toString(): string;
        toCode(): string;
        hasBDDAncestor(): boolean;
        static MetaStep: typeof MetaStep;
    }
    class MetaStep extends Step {
        isBDD(): boolean;
        run(): any;
    }
    /**
     * global values for current session
     */
    namespace store {
        var debugMode: boolean;
    }
    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */
    function Feature(title: string, opts?: {
        [key: string]: any;
    }): FeatureConfig;
    /**
     * Pending test suite.
     */
    const xFeature: CodeceptJS.IFeature;
    /**
     * Pending test case.
     */
    const xScenario: CodeceptJS.IScenario;
    /**
     * Pending test case with message: 'Test not implemented!'.
     */
    const todo: CodeceptJS.IScenario;
    function within(context: CodeceptJS.LocatorOrString, fn: (...params: any[]) => any): Promise<any> | undefined;
    class Detox {
        /**
         * Saves a screenshot to the output dir
         *
         * ```js
         * I.saveScreenshot('main-window.png');
         * ```
         */
        saveScreenshot(name: string): void;
        /**
         * Relaunches an application.
         *
         * ```js
         * I.relaunchApp();
         * ```
         */
        relaunchApp(): void;
        /**
         * Launches an application. If application instance already exists, use [relaunchApp](#relaunchApp).
         *
         * ```js
         * I.launchApp();
         * ```
         */
        launchApp(): void;
        /**
         * Installs a configured application.
         * Application is installed by default.
         *
         * ```js
         * I.installApp();
         * ```
         */
        installApp(): void;
        /**
         * Shakes the device.
         *
         * ```js
         * I.shakeDevice();
         * ```
         */
        shakeDevice(): void;
        /**
         * Goes back on Android
         *
         * ```js
         * I.goBack(); // on Android only
         * ```
         */
        goBack(): void;
        /**
         * Switches device to landscape orientation
         *
         * ```js
         * I.setLandscapeOrientation();
         * ```
         */
        setLandscapeOrientation(): void;
        /**
         * Switches device to portrait orientation
         *
         * ```js
         * I.setPortraitOrientation();
         * ```
         */
        setPortraitOrientation(): void;
        /**
         * Execute code only on iOS
         *
         * ```js
         * I.runOnIOS(() => {
         *    I.click('Button');
         *    I.see('Hi, IOS');
         * });
         * ```
         * @param fn - a function which will be executed on iOS
         */
        runOnIOS(fn: (...params: any[]) => any): void;
        /**
         * Execute code only on Android
         *
         * ```js
         * I.runOnAndroid(() => {
         *    I.click('Button');
         *    I.see('Hi, Android');
         * });
         * ```
         * @param fn - a function which will be executed on android
         */
        runOnAndroid(fn: (...params: any[]) => any): void;
        /**
         * Taps on an element.
         * Element can be located by its text or id or accessibility id.
         *
         * The second parameter is a context element to narrow the search.
         *
         * Same as [click](#click)
         *
         * ```js
         * I.tap('Login'); // locate by text
         * I.tap('~nav-1'); // locate by accessibility label
         * I.tap('#user'); // locate by id
         * I.tap('Login', '#nav'); // locate by text inside #nav
         * I.tap({ ios: 'Save', android: 'SAVE' }, '#main'); // different texts on iOS and Android
         * ```
         */
        tap(locator: CodeceptJS.LocatorOrString, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Multi taps on an element.
         * Element can be located by its text or id or accessibility id.
         *
         * Set the number of taps in second argument.
         * Optionally define the context element by third argument.
         *
         * ```js
         * I.multiTap('Login', 2); // locate by text
         * I.multiTap('~nav', 2); // locate by accessibility label
         * I.multiTap('#user', 2); // locate by id
         * I.multiTap('Update', 2, '#menu'); // locate by id
         * ```
         * @param locator - element to locate
         * @param num - number of taps
         * @param [context = null] - context element
         */
        multiTap(locator: CodeceptJS.LocatorOrString, num: number, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Taps an element and holds for a requested time.
         *
         * ```js
         * I.longPress('Login', 2); // locate by text, hold for 2 seconds
         * I.longPress('~nav', 1); // locate by accessibility label, hold for second
         * I.longPress('Update', 2, '#menu'); // locate by text inside #menu, hold for 2 seconds
         * ```
         * @param locator - element to locate
         * @param sec - number of seconds to hold tap
         * @param [context = null] - context element
         */
        longPress(locator: CodeceptJS.LocatorOrString, sec: number, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Clicks on an element.
         * Element can be located by its text or id or accessibility id
         *
         * The second parameter is a context (id | type | accessibility id) to narrow the search.
         *
         * Same as [tap](#tap)
         *
         * ```js
         * I.click('Login'); // locate by text
         * I.click('~nav-1'); // locate by accessibility label
         * I.click('#user'); // locate by id
         * I.click('Login', '#nav'); // locate by text inside #nav
         * I.click({ ios: 'Save', android: 'SAVE' }, '#main'); // different texts on iOS and Android
         * ```
         */
        click(locator: CodeceptJS.LocatorOrString, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Performs click on element with horizontal and vertical offset.
         * An element is located by text, id, accessibility id.
         *
         * ```js
         * I.clickAtPoint('Save', 10, 10);
         * I.clickAtPoint('~save', 10, 10); // locate by accessibility id
         * ```
         * @param [x = 0] - horizontal offset
         * @param [y = 0] - vertical offset
         */
        clickAtPoint(locator: CodeceptJS.LocatorOrString, x?: number, y?: number): void;
        /**
         * Checks text to be visible.
         * Use second parameter to narrow down the search.
         *
         * ```js
         * I.see('Record created');
         * I.see('Record updated', '#message');
         * I.see('Record deleted', '~message');
         * ```
         * @param text - to check visibility
         * @param [context = null] - element inside which to search for text
         */
        see(text: string, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Checks text not to be visible.
         * Use second parameter to narrow down the search.
         *
         * ```js
         * I.dontSee('Record created');
         * I.dontSee('Record updated', '#message');
         * I.dontSee('Record deleted', '~message');
         * ```
         * @param text - to check invisibility
         * @param [context = null] - element in which to search for text
         */
        dontSee(text: string, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Checks for visibility of an element.
         * Use second parameter to narrow down the search.
         *
         * ```js
         * I.seeElement('~edit'); // located by accessibility id
         * I.seeElement('~edit', '#menu'); // element inside #menu
         * ```
         * @param locator - element to locate
         * @param [context = null] - context element
         */
        seeElement(locator: CodeceptJS.LocatorOrString, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Checks that element is not visible.
         * Use second parameter to narrow down the search.
         *
         * ```js
         * I.dontSeeElement('~edit'); // located by accessibility id
         * I.dontSeeElement('~edit', '#menu'); // element inside #menu
         * ```
         * @param locator - element to locate
         * @param [context = null] - context element
         */
        dontSeeElement(locator: CodeceptJS.LocatorOrString, context?: CodeceptJS.LocatorOrString | null): void;
        /**
         * Checks for existence of an element. An element can be visible or not.
         * Use second parameter to narrow down the search.
         *
         * ```js
         * I.seeElementExists('~edit'); // located by accessibility id
         * I.seeElementExists('~edit', '#menu'); // element inside #menu
         * ```
         * @param locator - element to locate
         * @param [context = null] - context element
         */
        seeElementExists(locator: CodeceptJS.LocatorOrString, context?: CodeceptJS.LocatorOrString): void;
        /**
         * Checks that element not exists.
         * Use second parameter to narrow down the search.
         *
         * ```js
         * I.dontSeeElementExist('~edit'); // located by accessibility id
         * I.dontSeeElementExist('~edit', '#menu'); // element inside #menu
         * ```
         * @param locator - element to locate
         * @param [context = null] - context element
         */
        dontSeeElementExists(locator: CodeceptJS.LocatorOrString, context?: CodeceptJS.LocatorOrString): void;
        /**
         * Fills in text field in an app.
         * A field can be located by text, accessibility id, id.
         *
         * ```js
         * I.fillField('Username', 'davert');
         * I.fillField('~name', 'davert');
         * I.fillField({ android: 'NAME', ios: 'name' }, 'davert');
         * ```
         * @param field - an input element to fill in
         * @param value - value to fill
         */
        fillField(field: CodeceptJS.LocatorOrString, value: string): void;
        /**
         * Clears a text field.
         * A field can be located by text, accessibility id, id.
         *
         * ```js
         * I.clearField('~name');
         * ```
         * @param field - an input element to clear
         */
        clearField(field: CodeceptJS.LocatorOrString): void;
        /**
         * Appends text into the field.
         * A field can be located by text, accessibility id, id.
         *
         * ```js
         * I.appendField('name', 'davert');
         * ```
         */
        appendField(field: CodeceptJS.LocatorOrString, value: string): void;
        /**
         * Scrolls to the top of an element.
         *
         * ```js
         * I.scrollUp('#container');
         * ```
         */
        scrollUp(locator: CodeceptJS.LocatorOrString): void;
        /**
         * Scrolls to the bottom of an element.
         *
         * ```js
         * I.scrollDown('#container');
         * ```
         */
        scrollDown(locator: CodeceptJS.LocatorOrString): void;
        /**
         * Scrolls to the left of an element.
         *
         * ```js
         * I.scrollLeft('#container');
         * ```
         */
        scrollLeft(locator: CodeceptJS.LocatorOrString): void;
        /**
         * Scrolls to the right of an element.
         *
         * ```js
         * I.scrollRight('#container');
         * ```
         */
        scrollRight(locator: CodeceptJS.LocatorOrString): void;
        /**
         * Performs a swipe up inside an element.
         * Can be `slow` or `fast` swipe.
         *
         * ```js
         * I.swipeUp('#container');
         * ```
         * @param locator - an element on which to perform swipe
         * @param [speed = 'slow'] - a speed to perform: `slow` or `fast`.
         */
        swipeUp(locator: CodeceptJS.LocatorOrString, speed?: string): void;
        /**
         * Performs a swipe up inside an element.
         * Can be `slow` or `fast` swipe.
         *
         * ```js
         * I.swipeUp('#container');
         * ```
         * @param locator - an element on which to perform swipe
         * @param [speed = 'slow'] - a speed to perform: `slow` or `fast`.
         */
        swipeDown(locator: CodeceptJS.LocatorOrString, speed?: string): void;
        /**
         * Performs a swipe up inside an element.
         * Can be `slow` or `fast` swipe.
         *
         * ```js
         * I.swipeUp('#container');
         * ```
         * @param locator - an element on which to perform swipe
         * @param [speed = 'slow'] - a speed to perform: `slow` or `fast`.
         */
        swipeLeft(locator: CodeceptJS.LocatorOrString, speed?: string): void;
        /**
         * Performs a swipe up inside an element.
         * Can be `slow` or `fast` swipe.
         *
         * ```js
         * I.swipeUp('#container');
         * ```
         * @param locator - an element on which to perform swipe
         * @param [speed = 'slow'] - a speed to perform: `slow` or `fast`.
         */
        swipeRight(locator: CodeceptJS.LocatorOrString, speed?: string): void;
        /**
         * Waits for number of seconds
         *
         * ```js
         * I.wait(2); // waits for 2 seconds
         * ```
         * @param sec - number of seconds to wait
         */
        wait(sec: number): void;
        /**
         * Waits for an element to exist on page.
         *
         * ```js
         * I.waitForElement('#message', 1); // wait for 1 second
         * ```
         * @param locator - an element to wait for
         * @param [sec = 5] - number of seconds to wait, 5 by default
         */
        waitForElement(locator: CodeceptJS.LocatorOrString, sec?: number): void;
        /**
         * Waits for an element to be visible on page.
         *
         * ```js
         * I.waitForElementVisible('#message', 1); // wait for 1 second
         * ```
         * @param locator - an element to wait for
         * @param [sec = 5] - number of seconds to wait
         */
        waitForElementVisible(locator: CodeceptJS.LocatorOrString, sec?: number): void;
        /**
         * Waits an elment to become not visible.
         *
         * ```js
         * I.waitToHide('#message', 2); // wait for 2 seconds
         * ```
         * @param locator - an element to wait for
         * @param [sec = 5] - number of seconds to wait
         */
        waitToHide(locator: CodeceptJS.LocatorOrString, sec?: number): void;
    }
    /**
     * Abstract class.
     * Helpers abstracts test execution backends.
     *
     * Methods of Helper class will be available in tests in `I` object.
     * They provide user-friendly abstracted actions over NodeJS libraries.
     *
     * Hooks (methods starting with `_`) can be used to setup/teardown,
     * or handle execution flow.
     *
     * Methods are expected to return a value in order to be wrapped in promise.
     */
    class Helper {
        constructor(config: any);
        /**
         * Abstract method to provide required config options
         */
        protected static _config(): any;
        /**
         * Abstract method to validate config
         */
        protected _validateConfig(config: any): any;
        /**
         * Sets config for current test
         */
        protected _setConfig(opts: any): void;
        /**
         * Hook executed before all tests
         */
        protected _init(): void;
        /**
         * Hook executed before each test.
         */
        protected _before(): void;
        /**
         * Hook executed after each test
         */
        protected _after(): void;
        /**
         * Hook executed after each passed test
         */
        protected _passed(test: Mocha.Test): void;
        /**
         * Hook executed after each failed test
         */
        protected _failed(test: Mocha.Test): void;
        /**
         * Hook executed before each step
         */
        protected _beforeStep(step: CodeceptJS.Step): void;
        /**
         * Hook executed after each step
         */
        protected _afterStep(step: CodeceptJS.Step): void;
        /**
         * Hook executed before each suite
         */
        protected _beforeSuite(suite: Mocha.Suite): void;
        /**
         * Hook executed after each suite
         */
        protected _afterSuite(suite: Mocha.Suite): void;
        /**
         * Hook executed after all tests are executed
         */
        protected _finishTest(suite: Mocha.Suite): void;
        /**
         * Abstract method to provide common interface to accessing helpers internals inside a test.
         */
        _useTo(): void;
        /**
         * Access another configured helper: `this.helpers['AnotherHelper']`
         */
        readonly helpers: any;
        /**
         * Print debug message to console (outputs only in debug mode)
         */
        debug(msg: string): void;
        debugSection(section: string, msg: string): void;
    }
}


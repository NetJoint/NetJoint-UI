(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error('jQuery requires a window with a document');
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    var deletedIds = [];
    var document = window.document;
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var version = '1.12.3', jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: '',
        length: 0,
        toArray: function () {
            return slice.call(this);
        },
        get: function (num) {
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function (elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function (callback) {
            return jQuery.each(this, callback);
        },
        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };
    jQuery.extend = jQuery.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== 'object' && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),
        isReady: true,
        error: function (msg) {
            throw new Error(msg);
        },
        noop: function () {
        },
        isFunction: function (obj) {
            return jQuery.type(obj) === 'function';
        },
        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === 'array';
        },
        isWindow: function (obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function (obj) {
            var realStringObj = obj && obj.toString();
            return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
        },
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        isPlainObject: function (obj) {
            var key;
            if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            if (!support.ownFirst) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }
            for (key in obj) {
            }
            return key === undefined || hasOwn.call(obj, key);
        },
        type: function (obj) {
            if (obj == null) {
                return obj + '';
            }
            return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
        },
        globalEval: function (data) {
            if (data && jQuery.trim(data)) {
                (window.execScript || function (data) {
                    window['eval'].call(window, data);
                })(data);
            }
        },
        camelCase: function (string) {
            return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
        },
        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function (obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        trim: function (text) {
            return text == null ? '' : (text + '').replace(rtrim, '');
        },
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function (elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function (first, second) {
            var len = +second.length, j = 0, i = first.length;
            while (j < len) {
                first[i++] = second[j++];
            }
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function (elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function (elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function (fn, context) {
            var args, proxy, tmp;
            if (typeof context === 'string') {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: function () {
            return +new Date();
        },
        support: support
    });
    if (typeof Symbol === 'function') {
        jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator];
    }
    jQuery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (i, name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    function isArrayLike(obj) {
        var length = !!obj && 'length' in obj && obj.length, type = jQuery.type(obj);
        if (type === 'function' || jQuery.isWindow(obj)) {
            return false;
        }
        return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
    }
    var Sizzle = function (window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = 'sizzle' + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function (list, elem) {
                var i = 0, len = list.length;
                for (; i < len; i++) {
                    if (list[i] === elem) {
                        return i;
                    }
                }
                return -1;
            }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', whitespace = '[\\x20\\t\\r\\n\\f]', identifier = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace + '*([*^$|!~]?=)' + whitespace + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace + '*\\]', pseudos = ':(' + identifier + ')(?:\\((' + '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' + '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|' + '.*' + ')\\)|)', rwhitespace = new RegExp(whitespace + '+', 'g'), rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*?)' + whitespace + '*\\]', 'g'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
                'ID': new RegExp('^#(' + identifier + ')'),
                'CLASS': new RegExp('^\\.(' + identifier + ')'),
                'TAG': new RegExp('^(' + identifier + '|[*])'),
                'ATTR': new RegExp('^' + attributes),
                'PSEUDO': new RegExp('^' + pseudos),
                'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
                'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
                'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
                var high = '0x' + escaped - 65536;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
            }, unloadHandler = function () {
                setDocument();
            };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function (target, els) {
                    push_native.apply(target, slice.call(els));
                } : function (target, els) {
                    var j = target.length, i = 0;
                    while (target[j++] = els[i++]) {
                    }
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== 'string' || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results;
            }
            if (!seed) {
                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context);
                }
                context = context || document;
                if (documentIsHTML) {
                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                        if (m = match[1]) {
                            if (nodeType === 9) {
                                if (elem = context.getElementById(m)) {
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results;
                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results;
                        }
                    }
                    if (support.qsa && !compilerCache[selector + ' '] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (nodeType !== 1) {
                            newContext = context;
                            newSelector = selector;
                        } else if (context.nodeName.toLowerCase() !== 'object') {
                            if (nid = context.getAttribute('id')) {
                                nid = nid.replace(rescape, '\\$&');
                            } else {
                                context.setAttribute('id', nid = expando);
                            }
                            groups = tokenize(selector);
                            i = groups.length;
                            nidselect = ridentifier.test(nid) ? '#' + nid : '[id=\'' + nid + '\']';
                            while (i--) {
                                groups[i] = nidselect + ' ' + toSelector(groups[i]);
                            }
                            newSelector = groups.join(',');
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, newContext.querySelectorAll(newSelector));
                                return results;
                            } catch (qsaError) {
                            } finally {
                                if (nid === expando) {
                                    context.removeAttribute('id');
                                }
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, '$1'), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + ' ') > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return cache[key + ' '] = value;
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var div = document.createElement('div');
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                div = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split('|'), i = arr.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while (cur = cur.nextSibling) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return name === 'input' && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === 'input' || name === 'button') && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                argument = +argument;
                return markFunction(function (seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[j = matchIndexes[i]]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== 'undefined' && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function (elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== 'HTML' : false;
        };
        setDocument = Sizzle.setDocument = function (node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = document.documentElement;
            documentIsHTML = !isXML(document);
            if ((parent = document.defaultView) && parent.top !== parent) {
                if (parent.addEventListener) {
                    parent.addEventListener('unload', unloadHandler, false);
                } else if (parent.attachEvent) {
                    parent.attachEvent('onunload', unloadHandler);
                }
            }
            support.attributes = assert(function (div) {
                div.className = 'i';
                return !div.getAttribute('className');
            });
            support.getElementsByTagName = assert(function (div) {
                div.appendChild(document.createComment(''));
                return !div.getElementsByTagName('*').length;
            });
            support.getElementsByClassName = rnative.test(document.getElementsByClassName);
            support.getById = assert(function (div) {
                docElem.appendChild(div).id = expando;
                return !document.getElementsByName || !document.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find['ID'] = function (id, context) {
                    if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m ? [m] : [];
                    }
                };
                Expr.filter['ID'] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        return elem.getAttribute('id') === attrId;
                    };
                };
            } else {
                delete Expr.find['ID'];
                Expr.filter['ID'] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        var node = typeof elem.getAttributeNode !== 'undefined' && elem.getAttributeNode('id');
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
                if (typeof context.getElementsByTagName !== 'undefined') {
                    return context.getElementsByTagName(tag);
                } else if (support.qsa) {
                    return context.querySelectorAll(tag);
                }
            } : function (tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if (tag === '*') {
                    while (elem = results[i++]) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
                if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support.qsa = rnative.test(document.querySelectorAll)) {
                assert(function (div) {
                    docElem.appendChild(div).innerHTML = '<a id=\'' + expando + '\'></a>' + '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>' + '<option selected=\'\'></option></select>';
                    if (div.querySelectorAll('[msallowcapture^=\'\']').length) {
                        rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
                    }
                    if (!div.querySelectorAll('[selected]').length) {
                        rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
                    }
                    if (!div.querySelectorAll('[id~=' + expando + '-]').length) {
                        rbuggyQSA.push('~=');
                    }
                    if (!div.querySelectorAll(':checked').length) {
                        rbuggyQSA.push(':checked');
                    }
                    if (!div.querySelectorAll('a#' + expando + '+*').length) {
                        rbuggyQSA.push('.#.+[+~]');
                    }
                });
                assert(function (div) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    div.appendChild(input).setAttribute('name', 'D');
                    if (div.querySelectorAll('[name=d]').length) {
                        rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
                    }
                    if (!div.querySelectorAll(':enabled').length) {
                        rbuggyQSA.push(':enabled', ':disabled');
                    }
                    div.querySelectorAll('*,:x');
                    rbuggyQSA.push(',.*:');
                });
            }
            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                assert(function (div) {
                    support.disconnectedMatch = matches.call(div, 'div');
                    matches.call(div, '[s!=\'\']:x');
                    rbuggyMatches.push('!=', pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function (a, b) {
                if (b) {
                    while (b = b.parentNode) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            sortOrder = hasCompare ? function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                    if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                }
                return compare & 4 ? -1 : 1;
            } : function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                if (!aup || !bup) {
                    return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while (cur = cur.parentNode) {
                    ap.unshift(cur);
                }
                cur = b;
                while (cur = cur.parentNode) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return document;
        };
        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function (elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, '=\'$1\']');
            if (support.matchesSelector && documentIsHTML && !compilerCache[expr + ' '] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {
                }
            }
            return Sizzle(expr, document, null, [elem]).length > 0;
        };
        Sizzle.contains = function (context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function (elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        };
        Sizzle.error = function (msg) {
            throw new Error('Syntax error, unrecognized expression: ' + msg);
        };
        Sizzle.uniqueSort = function (results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        };
        getText = Sizzle.getText = function (elem) {
            var node, ret = '', i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                while (node = elem[i++]) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === 'string') {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                '>': {
                    dir: 'parentNode',
                    first: true
                },
                ' ': { dir: 'parentNode' },
                '+': {
                    dir: 'previousSibling',
                    first: true
                },
                '~': { dir: 'previousSibling' }
            },
            preFilter: {
                'ATTR': function (match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape);
                    if (match[2] === '~=') {
                        match[3] = ' ' + match[3] + ' ';
                    }
                    return match.slice(0, 4);
                },
                'CHILD': function (match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === 'nth') {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
                        match[5] = +(match[7] + match[8] || match[3] === 'odd');
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                'PSEUDO': function (match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr['CHILD'].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || '';
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                'TAG': function (nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === '*' ? function () {
                        return true;
                    } : function (elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                'CLASS': function (className) {
                    var pattern = classCache[className + ' '];
                    return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
                        return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== 'undefined' && elem.getAttribute('class') || '');
                    });
                },
                'ATTR': function (name, operator, check) {
                    return function (elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === '!=';
                        }
                        if (!operator) {
                            return true;
                        }
                        result += '';
                        return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
                    };
                },
                'CHILD': function (type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
                    return first === 1 && last === 0 ? function (elem) {
                        return !!elem.parentNode;
                    } : function (elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === 'only' && !start && 'nextSibling';
                                }
                                return true;
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                node = parent;
                                outerCache = node[expando] || (node[expando] = {});
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                cache = uniqueCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = nodeIndex && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        uniqueCache[type] = [
                                            dirruns,
                                            nodeIndex,
                                            diff
                                        ];
                                        break;
                                    }
                                }
                            } else {
                                if (useCache) {
                                    node = elem;
                                    outerCache = node[expando] || (node[expando] = {});
                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                    cache = uniqueCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = nodeIndex;
                                }
                                if (diff === false) {
                                    while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                            if (useCache) {
                                                outerCache = node[expando] || (node[expando] = {});
                                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                uniqueCache[type] = [
                                                    dirruns,
                                                    diff
                                                ];
                                            }
                                            if (node === elem) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                'PSEUDO': function (pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [
                            pseudo,
                            pseudo,
                            '',
                            argument
                        ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function (elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                'not': markFunction(function (selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
                    return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if (elem = unmatched[i]) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function (elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        input[0] = null;
                        return !results.pop();
                    };
                }),
                'has': markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                'contains': markFunction(function (text) {
                    text = text.replace(runescape, funescape);
                    return function (elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                'lang': markFunction(function (lang) {
                    if (!ridentifier.test(lang || '')) {
                        Sizzle.error('unsupported lang: ' + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                'target': function (elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                'root': function (elem) {
                    return elem === docElem;
                },
                'focus': function (elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                'enabled': function (elem) {
                    return elem.disabled === false;
                },
                'disabled': function (elem) {
                    return elem.disabled === true;
                },
                'checked': function (elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
                },
                'selected': function (elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                'empty': function (elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                'parent': function (elem) {
                    return !Expr.pseudos['empty'](elem);
                },
                'header': function (elem) {
                    return rheader.test(elem.nodeName);
                },
                'input': function (elem) {
                    return rinputs.test(elem.nodeName);
                },
                'button': function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === 'input' && elem.type === 'button' || name === 'button';
                },
                'text': function (elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text');
                },
                'first': createPositionalPseudo(function () {
                    return [0];
                }),
                'last': createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1];
                }),
                'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                'even': createPositionalPseudo(function (matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                'odd': createPositionalPseudo(function (matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos['nth'] = Expr.pseudos['eq'];
        for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
                submit: true,
                reset: true
            }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {
        }
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function (selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, ' ')
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = '';
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && dir === 'parentNode', doneName = done++;
            return combinator.first ? function (elem, context, xml) {
                while (elem = elem[dir]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function (elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [
                        dirruns,
                        doneName
                    ];
                if (xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                            if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return newCache[2] = oldCache[2];
                            } else {
                                uniqueCache[dir] = newCache;
                                if (newCache[2] = matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function (elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (; i < len; i++) {
                if (elem = unmatched[i]) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if (elem = temp[i]) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if (elem = matcherOut[i]) {
                                    temp.push(matcherIn[i] = elem);
                                }
                            }
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
                    return indexOf(checkContext, elem) > -1;
                }, implicitRelative, true), matchers = [function (elem, context, xml) {
                        var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                        checkContext = null;
                        return ret;
                    }];
            for (; i < len; i++) {
                if (matcher = Expr.relative[tokens[i].type]) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0, i = '0', unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
                    if (outermost) {
                        outermostContext = context === document || context || outermost;
                    }
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            if (!context && elem.ownerDocument !== document) {
                                setDocument(elem);
                                xml = !documentIsHTML;
                            }
                            while (matcher = elementMatchers[j++]) {
                                if (matcher(elem, context || document, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                            }
                        }
                        if (bySet) {
                            if (elem = !matcher && elem) {
                                matchedCount--;
                            }
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while (matcher = setMatchers[j++]) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function (selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        };
        select = Sizzle.select = function (selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === 'function' && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[type = token.type]) {
                        break;
                    }
                    if (find = Expr.find[type]) {
                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function (div1) {
            return div1.compareDocumentPosition(document.createElement('div')) & 1;
        });
        if (!assert(function (div) {
                div.innerHTML = '<a href=\'#\'></a>';
                return div.firstChild.getAttribute('href') === '#';
            })) {
            addHandle('type|href|height|width', function (elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function (div) {
                div.innerHTML = '<input/>';
                div.firstChild.setAttribute('value', '');
                return div.firstChild.getAttribute('value') === '';
            })) {
            addHandle('value', function (elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === 'input') {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function (div) {
                return div.getAttribute('disabled') == null;
            })) {
            addHandle(booleans, function (elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    }(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var dir = function (elem, dir, until) {
        var matched = [], truncate = until !== undefined;
        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };
    var siblings = function (n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }
        return matched;
    };
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple = /^.[^:#\[\.,]*$/;
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return elem === qualifier !== not;
            });
        }
        if (typeof qualifier === 'string') {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function (elem) {
            return jQuery.inArray(elem, qualifier) > -1 !== not;
        });
    }
    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ':not(' + expr + ')';
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function (selector) {
            var i, ret = [], self = this, len = self.length;
            if (typeof selector !== 'string') {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + ' ' + selector : selector;
            return ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(this, typeof selector === 'string' && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;
            if (!selector) {
                return this;
            }
            root = root || rootjQuery;
            if (typeof selector === 'string') {
                if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
                    match = [
                        null,
                        selector,
                        null
                    ];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) {
                    return (context || root).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) {
                return typeof root.ready !== 'undefined' ? root.ready(selector) : selector(jQuery);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        has: function (target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function () {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function (selectors, context) {
            var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break;
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function (elem) {
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === 'string') {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function (selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function (selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);
        return cur;
    }
    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return dir(elem, 'parentNode');
        },
        parentsUntil: function (elem, i, until) {
            return dir(elem, 'parentNode', until);
        },
        next: function (elem) {
            return sibling(elem, 'nextSibling');
        },
        prev: function (elem) {
            return sibling(elem, 'previousSibling');
        },
        nextAll: function (elem) {
            return dir(elem, 'nextSibling');
        },
        prevAll: function (elem) {
            return dir(elem, 'previousSibling');
        },
        nextUntil: function (elem, i, until) {
            return dir(elem, 'nextSibling', until);
        },
        prevUntil: function (elem, i, until) {
            return dir(elem, 'previousSibling', until);
        },
        siblings: function (elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function (elem) {
            return siblings(elem.firstChild);
        },
        contents: function (elem) {
            return jQuery.nodeName(elem, 'iframe') ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (name.slice(-5) !== 'Until') {
                selector = until;
            }
            if (selector && typeof selector === 'string') {
                ret = jQuery.filter(selector, ret);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    ret = jQuery.uniqueSort(ret);
                }
                if (rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
            }
            return this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g;
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function (options) {
        options = typeof options === 'string' ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function () {
                locked = options.once;
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }
                if (!options.memory) {
                    memory = false;
                }
                firing = false;
                if (locked) {
                    if (memory) {
                        list = [];
                    } else {
                        list = '';
                    }
                }
            }, self = {
                add: function () {
                    if (list) {
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && jQuery.type(arg) !== 'string') {
                                    add(arg);
                                }
                            });
                        }(arguments));
                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },
                has: function (fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
                },
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },
                disable: function () {
                    locked = queue = [];
                    list = memory = '';
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                lock: function () {
                    locked = true;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [
                            context,
                            args.slice ? args.slice() : args
                        ];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function () {
                    return !!fired;
                }
            };
        return self;
    };
    jQuery.extend({
        Deferred: function (func) {
            var tuples = [
                    [
                        'resolve',
                        'done',
                        jQuery.Callbacks('once memory'),
                        'resolved'
                    ],
                    [
                        'reject',
                        'fail',
                        jQuery.Callbacks('once memory'),
                        'rejected'
                    ],
                    [
                        'notify',
                        'progress',
                        jQuery.Callbacks('memory')
                    ]
                ], state = 'pending', promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function () {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                                    } else {
                                        newDefer[tuple[0] + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function () {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + 'With'] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function (subordinate) {
            var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!--remaining) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function (fn) {
        jQuery.ready.promise().done(fn);
        return this;
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function (wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler('ready');
                jQuery(document).off('ready');
            }
        }
    });
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener('DOMContentLoaded', completed);
            window.removeEventListener('load', completed);
        } else {
            document.detachEvent('onreadystatechange', completed);
            window.detachEvent('onload', completed);
        }
    }
    function completed() {
        if (document.addEventListener || window.event.type === 'load' || document.readyState === 'complete') {
            detach();
            jQuery.ready();
        }
    }
    jQuery.ready.promise = function (obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
                window.setTimeout(jQuery.ready);
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', completed);
                window.addEventListener('load', completed);
            } else {
                document.attachEvent('onreadystatechange', completed);
                window.attachEvent('onload', completed);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {
                }
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll('left');
                            } catch (e) {
                                return window.setTimeout(doScrollCheck, 50);
                            }
                            detach();
                            jQuery.ready();
                        }
                    }());
                }
            }
        }
        return readyList.promise(obj);
    };
    jQuery.ready.promise();
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownFirst = i === '0';
    support.inlineBlockNeedsLayout = false;
    jQuery(function () {
        var val, div, body, container;
        body = document.getElementsByTagName('body')[0];
        if (!body || !body.style) {
            return;
        }
        div = document.createElement('div');
        container = document.createElement('div');
        container.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px';
        body.appendChild(container).appendChild(div);
        if (typeof div.style.zoom !== 'undefined') {
            div.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1';
            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                body.style.zoom = 1;
            }
        }
        body.removeChild(container);
    });
    (function () {
        var div = document.createElement('div');
        support.deleteExpando = true;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        div = null;
    }());
    var acceptData = function (elem) {
        var noData = jQuery.noData[(elem.nodeName + ' ').toLowerCase()], nodeType = +elem.nodeType || 1;
        return nodeType !== 1 && nodeType !== 9 ? false : !noData || noData !== true && elem.getAttribute('classid') === noData;
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === 'string') {
                try {
                    data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {
                }
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === 'data' && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== 'toJSON') {
                return false;
            }
        }
        return true;
    }
    function internalData(elem, name, data, pvt) {
        if (!acceptData(elem)) {
            return;
        }
        var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === 'string') {
            return;
        }
        if (!id) {
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }
        if (!cache[id]) {
            cache[id] = isNode ? {} : { toJSON: jQuery.noop };
        }
        if (typeof name === 'object' || typeof name === 'function') {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }
        thisCache = cache[id];
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }
            thisCache = thisCache.data;
        }
        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }
        if (typeof name === 'string') {
            ret = thisCache[name];
            if (ret == null) {
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }
        return ret;
    }
    function internalRemoveData(elem, name, pvt) {
        if (!acceptData(elem)) {
            return;
        }
        var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
        if (!cache[id]) {
            return;
        }
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                if (!jQuery.isArray(name)) {
                    if (name in thisCache) {
                        name = [name];
                    } else {
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(' ');
                        }
                    }
                } else {
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }
                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }
        if (!pvt) {
            delete cache[id].data;
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }
        if (isNode) {
            jQuery.cleanData([elem], true);
        } else if (support.deleteExpando || cache != cache.window) {
            delete cache[id];
        } else {
            cache[id] = undefined;
        }
    }
    jQuery.extend({
        cache: {},
        noData: {
            'applet ': true,
            'embed ': true,
            'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
        },
        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },
        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });
    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, 'parsedAttrs')) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf('data-') === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, 'parsedAttrs', true);
                    }
                }
                return data;
            }
            if (typeof key === 'object') {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }
            return arguments.length > 1 ? this.each(function () {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },
        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;
            if (elem) {
                type = (type || 'fx') + 'queue';
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function (elem, type) {
            type = type || 'fx';
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
                    jQuery.dequeue(elem, type);
                };
            if (fn === 'inprogress') {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === 'fx') {
                    queue.unshift('inprogress');
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function (elem, type) {
            var key = type + 'queueHooks';
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks('once memory').add(function () {
                    jQuery._removeData(elem, type + 'queue');
                    jQuery._removeData(elem, key);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;
            if (typeof type !== 'string') {
                data = type;
                type = 'fx';
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function () {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === 'fx' && queue[0] !== 'inprogress') {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || 'fx', []);
        },
        promise: function (type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                    if (!--count) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
            if (typeof type !== 'string') {
                obj = type;
                type = undefined;
            }
            type = type || 'fx';
            while (i--) {
                tmp = jQuery._data(elements[i], type + 'queueHooks');
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    (function () {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function () {
            if (shrinkWrapBlocksVal != null) {
                return shrinkWrapBlocksVal;
            }
            shrinkWrapBlocksVal = false;
            var div, body, container;
            body = document.getElementsByTagName('body')[0];
            if (!body || !body.style) {
                return;
            }
            div = document.createElement('div');
            container = document.createElement('div');
            container.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px';
            body.appendChild(container).appendChild(div);
            if (typeof div.style.zoom !== 'undefined') {
                div.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;' + 'box-sizing:content-box;display:block;margin:0;border:0;' + 'padding:1px;width:1px;zoom:1';
                div.appendChild(document.createElement('div')).style.width = '5px';
                shrinkWrapBlocksVal = div.offsetWidth !== 3;
            }
            body.removeChild(container);
            return shrinkWrapBlocksVal;
        };
    }());
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var rcssNum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i');
    var cssExpand = [
        'Top',
        'Right',
        'Bottom',
        'Left'
    ];
    var isHidden = function (elem, el) {
        elem = el || elem;
        return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
    };
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function () {
                return tween.cur();
            } : function () {
                return jQuery.css(elem, prop, '');
            }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? '' : 'px'), initialInUnit = (jQuery.cssNumber[prop] || unit !== 'px' && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3];
            valueParts = valueParts || [];
            initialInUnit = +initial || 1;
            do {
                scale = scale || '.5';
                initialInUnit = initialInUnit / scale;
                jQuery.style(elem, prop, initialInUnit + unit);
            } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
        }
        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = key == null;
        if (jQuery.type(key) === 'object') {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (; i < length; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    };
    var rcheckableType = /^(?:checkbox|radio)$/i;
    var rtagName = /<([\w:-]+)/;
    var rscriptType = /^$|\/(?:java|ecma)script/i;
    var rleadingWhitespace = /^\s+/;
    var nodeNames = 'abbr|article|aside|audio|bdi|canvas|data|datalist|' + 'details|dialog|figcaption|figure|footer|header|hgroup|main|' + 'mark|meter|nav|output|picture|progress|section|summary|template|time|video';
    function createSafeFragment(document) {
        var list = nodeNames.split('|'), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    (function () {
        var div = document.createElement('div'), fragment = document.createDocumentFragment(), input = document.createElement('input');
        div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
        support.leadingWhitespace = div.firstChild.nodeType === 3;
        support.tbody = !div.getElementsByTagName('tbody').length;
        support.htmlSerialize = !!div.getElementsByTagName('link').length;
        support.html5Clone = document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
        input.type = 'checkbox';
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        div.innerHTML = '<textarea>x</textarea>';
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        fragment.appendChild(div);
        input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('checked', 'checked');
        input.setAttribute('name', 't');
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        support.noCloneEvent = !!div.addEventListener;
        div[jQuery.expando] = 1;
        support.attributes = !div.getAttribute(jQuery.expando);
    }());
    var wrapMap = {
        option: [
            1,
            '<select multiple=\'multiple\'>',
            '</select>'
        ],
        legend: [
            1,
            '<fieldset>',
            '</fieldset>'
        ],
        area: [
            1,
            '<map>',
            '</map>'
        ],
        param: [
            1,
            '<object>',
            '</object>'
        ],
        thead: [
            1,
            '<table>',
            '</table>'
        ],
        tr: [
            2,
            '<table><tbody>',
            '</tbody></table>'
        ],
        col: [
            2,
            '<table><tbody></tbody><colgroup>',
            '</colgroup></table>'
        ],
        td: [
            3,
            '<table><tbody><tr>',
            '</tr></tbody></table>'
        ],
        _default: support.htmlSerialize ? [
            0,
            '',
            ''
        ] : [
            1,
            'X<div>',
            '</div>'
        ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== 'undefined' ? context.getElementsByTagName(tag || '*') : typeof context.querySelectorAll !== 'undefined' ? context.querySelectorAll(tag || '*') : undefined;
        if (!found) {
            for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
    }
    function setGlobalEval(elems, refElements) {
        var elem, i = 0;
        for (; (elem = elems[i]) != null; i++) {
            jQuery._data(elem, 'globalEval', !refElements || jQuery._data(refElements[i], 'globalEval'));
        }
    }
    var rhtml = /<|&#?\w+;/, rtbody = /<tbody/i;
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }
    function buildFragment(elems, context, scripts, selection, ignored) {
        var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0;
        for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
                if (jQuery.type(elem) === 'object') {
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));
                } else {
                    tmp = tmp || safe.appendChild(context.createElement('div'));
                    tag = (rtagName.exec(elem) || [
                        '',
                        ''
                    ])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }
                    if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                        nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                    }
                    if (!support.tbody) {
                        elem = tag === 'table' && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === '<table>' && !rtbody.test(elem) ? tmp : 0;
                        j = elem && elem.childNodes.length;
                        while (j--) {
                            if (jQuery.nodeName(tbody = elem.childNodes[j], 'tbody') && !tbody.childNodes.length) {
                                elem.removeChild(tbody);
                            }
                        }
                    }
                    jQuery.merge(nodes, tmp.childNodes);
                    tmp.textContent = '';
                    while (tmp.firstChild) {
                        tmp.removeChild(tmp.firstChild);
                    }
                    tmp = safe.lastChild;
                }
            }
        }
        if (tmp) {
            safe.removeChild(tmp);
        }
        if (!support.appendChecked) {
            jQuery.grep(getAll(nodes, 'input'), fixDefaultChecked);
        }
        i = 0;
        while (elem = nodes[i++]) {
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }
            contains = jQuery.contains(elem.ownerDocument, elem);
            tmp = getAll(safe.appendChild(elem), 'script');
            if (contains) {
                setGlobalEval(tmp);
            }
            if (scripts) {
                j = 0;
                while (elem = tmp[j++]) {
                    if (rscriptType.test(elem.type || '')) {
                        scripts.push(elem);
                    }
                }
            }
        }
        tmp = null;
        return safe;
    }
    (function () {
        var i, eventName, div = document.createElement('div');
        for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
            eventName = 'on' + i;
            if (!(support[i] = eventName in window)) {
                div.setAttribute(eventName, 't');
                support[i] = div.attributes[eventName].expando === false;
            }
        }
        div = null;
    }());
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {
        }
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === 'object') {
            if (typeof selector !== 'string') {
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }
        if (data == null && fn == null) {
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === 'string') {
                fn = data;
                data = undefined;
            } else {
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return elem;
        }
        if (one === 1) {
            origFn = fn;
            fn = function (event) {
                jQuery().off(event);
                return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function () {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }
    jQuery.event = {
        global: {},
        add: function (elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    return typeof jQuery !== 'undefined' && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = (types || '').match(rnotwhite) || [''];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || '').split('.').sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join('.')
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent('on' + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || '').match(rnotwhite) || [''];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || '').split('.').sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery._removeData(elem, 'events');
            }
        },
        trigger: function (event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document], type = hasOwn.call(event, 'type') ? event.type : event, namespaces = hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf('.') > -1) {
                namespaces = type.split('.');
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(':') < 0 && 'on' + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join('.');
            event.rnamespace = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (jQuery._data(cur, 'events') || {})[event.type] && jQuery._data(cur, 'handle');
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {
                        }
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function (event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function (event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (event.type !== 'click' || isNaN(event.button) || event.button < 1)) {
                for (; cur != this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== 'click')) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + ' ';
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: ('altKey bubbles cancelable ctrlKey currentTarget detail eventPhase ' + 'metaKey relatedTarget shiftKey target timeStamp view which').split(' '),
        fixHooks: {},
        keyHooks: {
            props: 'char charCode key keyCode'.split(' '),
            filter: function (event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: ('button buttons clientX clientY fromElement offsetX offsetY ' + 'pageX pageY screenX screenY toElement').split(' '),
            filter: function (event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }
                return event;
            }
        },
        special: {
            load: { noBubble: true },
            focus: {
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {
                        }
                    }
                },
                delegateType: 'focusin'
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: 'focusout'
            },
            click: {
                trigger: function () {
                    if (jQuery.nodeName(this, 'input') && this.type === 'checkbox' && this.click) {
                        this.click();
                        return false;
                    }
                },
                _default: function (event) {
                    return jQuery.nodeName(event.target, 'a');
                }
            },
            beforeunload: {
                postDispatch: function (event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function (type, elem, event) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true
            });
            jQuery.event.trigger(e, null, elem);
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    } : function (elem, type, handle) {
        var name = 'on' + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === 'undefined') {
                elem[name] = null;
            }
            elem.detachEvent(name, handle);
        }
    };
    jQuery.Event = function (src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e || this.isSimulated) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function (event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!support.submit) {
        jQuery.event.special.submit = {
            setup: function () {
                if (jQuery.nodeName(this, 'form')) {
                    return false;
                }
                jQuery.event.add(this, 'click._submit keypress._submit', function (e) {
                    var elem = e.target, form = jQuery.nodeName(elem, 'input') || jQuery.nodeName(elem, 'button') ? jQuery.prop(elem, 'form') : undefined;
                    if (form && !jQuery._data(form, 'submit')) {
                        jQuery.event.add(form, 'submit._submit', function (event) {
                            event._submitBubble = true;
                        });
                        jQuery._data(form, 'submit', true);
                    }
                });
            },
            postDispatch: function (event) {
                if (event._submitBubble) {
                    delete event._submitBubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate('submit', this.parentNode, event);
                    }
                }
            },
            teardown: function () {
                if (jQuery.nodeName(this, 'form')) {
                    return false;
                }
                jQuery.event.remove(this, '._submit');
            }
        };
    }
    if (!support.change) {
        jQuery.event.special.change = {
            setup: function () {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === 'checkbox' || this.type === 'radio') {
                        jQuery.event.add(this, 'propertychange._change', function (event) {
                            if (event.originalEvent.propertyName === 'checked') {
                                this._justChanged = true;
                            }
                        });
                        jQuery.event.add(this, 'click._change', function (event) {
                            if (this._justChanged && !event.isTrigger) {
                                this._justChanged = false;
                            }
                            jQuery.event.simulate('change', this, event);
                        });
                    }
                    return false;
                }
                jQuery.event.add(this, 'beforeactivate._change', function (e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, 'change')) {
                        jQuery.event.add(elem, 'change._change', function (event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate('change', this.parentNode, event);
                            }
                        });
                        jQuery._data(elem, 'change', true);
                    }
                });
            },
            handle: function (event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== 'radio' && elem.type !== 'checkbox') {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function () {
                jQuery.event.remove(this, '._change');
                return !rformElems.test(this.nodeName);
            }
        };
    }
    if (!support.focusin) {
        jQuery.each({
            focus: 'focusin',
            blur: 'focusout'
        }, function (orig, fix) {
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };
            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === 'object') {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === 'function') {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp('<(?:' + nodeNames + ')[\\s/>]', 'i'), rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement('div'));
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, 'table') && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr') ? elem.getElementsByTagName('tbody')[0] || elem.appendChild(elem.ownerDocument.createElement('tbody')) : elem;
    }
    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, 'type') !== null) + '/' + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute('type');
        }
        return elem;
    }
    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (dest.nodeType !== 1) {
            return;
        }
        nodeName = dest.nodeName.toLowerCase();
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);
            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }
            dest.removeAttribute(jQuery.expando);
        }
        if (nodeName === 'script' && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);
        } else if (nodeName === 'object') {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }
            if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }
        } else if (nodeName === 'input' && rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === 'option') {
            dest.defaultSelected = dest.selected = src.defaultSelected;
        } else if (nodeName === 'input' || nodeName === 'textarea') {
            dest.defaultValue = src.defaultValue;
        }
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var first, node, hasScripts, scripts, doc, fragment, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
        if (isFunction || l > 1 && typeof value === 'string' && !support.checkClone && rchecked.test(value)) {
            return collection.each(function (index) {
                var self = collection.eq(index);
                if (isFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }
        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
                fragment = first;
            }
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
                hasScripts = scripts.length;
                for (; i < l; i++) {
                    node = fragment;
                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);
                        if (hasScripts) {
                            jQuery.merge(scripts, getAll(node, 'script'));
                        }
                    }
                    callback.call(collection[i], node, i);
                }
                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;
                    jQuery.map(scripts, restoreScript);
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || '') && !jQuery._data(node, 'globalEval') && jQuery.contains(doc, node)) {
                            if (node.src) {
                                if (jQuery._evalUrl) {
                                    jQuery._evalUrl(node.src);
                                }
                            } else {
                                jQuery.globalEval((node.text || node.textContent || node.innerHTML || '').replace(rcleanScript, ''));
                            }
                        }
                    }
                }
                fragment = first = null;
            }
        }
        return collection;
    }
    function remove(elem, selector, keepData) {
        var node, elems = selector ? jQuery.filter(selector, elem) : elem, i = 0;
        for (; (node = elems[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }
            if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                    setGlobalEval(getAll(node, 'script'));
                }
                node.parentNode.removeChild(node);
            }
        }
        return elem;
    }
    jQuery.extend({
        htmlPrefilter: function (html) {
            return html.replace(rxhtmlTag, '<$1></$2>');
        },
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test('<' + elem.nodeName + '>')) {
                clone = elem.cloneNode(true);
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }
            if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0; (node = srcElements[i]) != null; ++i) {
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0; (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, 'script');
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
            }
            destElements = srcElements = node = null;
            return clone;
        },
        cleanData: function (elems, forceAcceptData) {
            var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, attributes = support.attributes, special = jQuery.event.special;
            for (; (elem = elems[i]) != null; i++) {
                if (forceAcceptData || acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (!attributes && typeof elem.removeAttribute !== 'undefined') {
                                elem.removeAttribute(internalKey);
                            } else {
                                elem[internalKey] = undefined;
                            }
                            deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        domManip: domManip,
        detach: function (selector) {
            return remove(this, selector, true);
        },
        remove: function (selector) {
            return remove(this, selector);
        },
        text: function (value) {
            return access(this, function (value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        empty: function () {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
                if (elem.options && jQuery.nodeName(elem, 'select')) {
                    elem.options.length = 0;
                }
            }
            return this;
        },
        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function (value) {
            return access(this, function (value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, '') : undefined;
                }
                if (typeof value === 'string' && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [
                        '',
                        ''
                    ])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {
                    }
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function () {
            var ignored = [];
            return domManip(this, arguments, function (elem) {
                var parent = this.parentNode;
                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }
            }, ignored);
        }
    });
    jQuery.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {
            HTML: 'block',
            BODY: 'block'
        };
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], 'display');
        elem.detach();
        return display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === 'none' || !display) {
                iframe = (iframe || jQuery('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    var rmargin = /^margin/;
    var rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i');
    var swap = function (elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    var documentElement = document.documentElement;
    (function () {
        var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal, container = document.createElement('div'), div = document.createElement('div');
        if (!div.style) {
            return;
        }
        div.style.cssText = 'float:left;opacity:.5';
        support.opacity = div.style.opacity === '0.5';
        support.cssFloat = !!div.style.cssFloat;
        div.style.backgroundClip = 'content-box';
        div.cloneNode(true).style.backgroundClip = '';
        support.clearCloneStyle = div.style.backgroundClip === 'content-box';
        container = document.createElement('div');
        container.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;' + 'padding:0;margin-top:1px;position:absolute';
        div.innerHTML = '';
        container.appendChild(div);
        support.boxSizing = div.style.boxSizing === '' || div.style.MozBoxSizing === '' || div.style.WebkitBoxSizing === '';
        jQuery.extend(support, {
            reliableHiddenOffsets: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },
            pixelMarginRight: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelMarginRightVal;
            },
            pixelPosition: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },
            reliableMarginRight: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return reliableMarginRightVal;
            },
            reliableMarginLeft: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return reliableMarginLeftVal;
            }
        });
        function computeStyleTests() {
            var contents, divStyle, documentElement = document.documentElement;
            documentElement.appendChild(container);
            div.style.cssText = '-webkit-box-sizing:border-box;box-sizing:border-box;' + 'position:relative;display:block;' + 'margin:auto;border:1px;padding:1px;' + 'top:1%;width:50%';
            pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
            pixelMarginRightVal = reliableMarginRightVal = true;
            if (window.getComputedStyle) {
                divStyle = window.getComputedStyle(div);
                pixelPositionVal = (divStyle || {}).top !== '1%';
                reliableMarginLeftVal = (divStyle || {}).marginLeft === '2px';
                boxSizingReliableVal = (divStyle || { width: '4px' }).width === '4px';
                div.style.marginRight = '50%';
                pixelMarginRightVal = (divStyle || { marginRight: '4px' }).marginRight === '4px';
                contents = div.appendChild(document.createElement('div'));
                contents.style.cssText = div.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;' + 'box-sizing:content-box;display:block;margin:0;border:0;padding:0';
                contents.style.marginRight = contents.style.width = '0';
                div.style.width = '1px';
                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight);
                div.removeChild(contents);
            }
            div.style.display = 'none';
            reliableHiddenOffsetsVal = div.getClientRects().length === 0;
            if (reliableHiddenOffsetsVal) {
                div.style.display = '';
                div.innerHTML = '<table><tr><td></td><td>t</td></tr></table>';
                contents = div.getElementsByTagName('td');
                contents[0].style.cssText = 'margin:0;border:0;padding:0;display:none';
                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
                if (reliableHiddenOffsetsVal) {
                    contents[0].style.display = '';
                    contents[1].style.display = 'none';
                    reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
                }
            }
            documentElement.removeChild(container);
        }
    }());
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
        getStyles = function (elem) {
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window;
            }
            return view.getComputedStyle(elem);
        };
        curCSS = function (elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
            if ((ret === '' || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }
            if (computed) {
                if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret === undefined ? ret : ret + '';
        };
    } else if (documentElement.currentStyle) {
        getStyles = function (elem) {
            return elem.currentStyle;
        };
        curCSS = function (elem, name, computed) {
            var left, rs, rsLeft, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed[name] : undefined;
            if (ret == null && style && style[name]) {
                ret = style[name];
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === 'fontSize' ? '1em' : ret;
                ret = style.pixelLeft + 'px';
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }
            return ret === undefined ? ret : ret + '' || 'auto';
        };
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function () {
                if (conditionFn()) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/i, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp('^(' + pnum + ')(.*)$', 'i'), cssShow = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
        }, cssNormalTransform = {
            letterSpacing: '0',
            fontWeight: '400'
        }, cssPrefixes = [
            'Webkit',
            'O',
            'Moz',
            'ms'
        ], emptyStyle = document.createElement('div').style;
    function vendorPropName(name) {
        if (name in emptyStyle) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1), i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }
    function showHide(elements, show) {
        var display, elem, hidden, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = jQuery._data(elem, 'olddisplay');
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === 'none') {
                    elem.style.display = '';
                }
                if (elem.style.display === '' && isHidden(elem)) {
                    values[index] = jQuery._data(elem, 'olddisplay', defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);
                if (display && display !== 'none' || !hidden) {
                    jQuery._data(elem, 'olddisplay', hidden ? display : jQuery.css(elem, 'display'));
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === 'none' || elem.style.display === '') {
                elem.style.display = show ? values[index] || '' : 'none';
            }
        }
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
        for (; i < 4; i += 2) {
            if (extra === 'margin') {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === 'content') {
                    val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
                }
                if (extra !== 'margin') {
                    val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
                }
            } else {
                val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
                if (extra !== 'padding') {
                    val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true, val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
        if (document.msFullscreenElement && window.top !== window) {
            if (elem.getClientRects().length) {
                val = Math.round(elem.getBoundingClientRect()[name] * 100);
            }
        }
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, 'opacity');
                        return ret === '' ? '1' : ret;
                    }
                }
            }
        },
        cssNumber: {
            'animationIterationCount': true,
            'columnCount': true,
            'fillOpacity': true,
            'flexGrow': true,
            'flexShrink': true,
            'fontWeight': true,
            'lineHeight': true,
            'opacity': true,
            'order': true,
            'orphans': true,
            'widows': true,
            'zIndex': true,
            'zoom': true
        },
        cssProps: { 'float': support.cssFloat ? 'cssFloat' : 'styleFloat' },
        style: function (elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);
                    type = 'number';
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === 'number') {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? '' : 'px');
                }
                if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
                    style[name] = 'inherit';
                }
                if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {
                    }
                }
            } else {
                if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && 'get' in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === 'normal' && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === '' || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each([
        'height',
        'width'
    ], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, 'display')) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function (elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
            }
        };
    });
    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function (elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : computed ? '1' : '';
            },
            set: function (elem, value) {
                var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? 'alpha(opacity=' + value * 100 + ')' : '', filter = currentStyle && currentStyle.filter || style.filter || '';
                style.zoom = 1;
                if ((value >= 1 || value === '') && jQuery.trim(filter.replace(ralpha, '')) === '' && style.removeAttribute) {
                    style.removeAttribute('filter');
                    if (value === '' || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity;
            }
        };
    }
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
        if (computed) {
            return swap(elem, { 'display': 'inline-block' }, curCSS, [
                elem,
                'marginRight'
            ]);
        }
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
        if (computed) {
            return (parseFloat(curCSS(elem, 'marginLeft')) || (jQuery.contains(elem.ownerDocument, elem) ? elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
                return elem.getBoundingClientRect().left;
            }) : 0)) + 'px';
        }
    });
    jQuery.each({
        margin: '',
        padding: '',
        border: 'Width'
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0, expanded = {}, parts = typeof value === 'string' ? value.split(' ') : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function (name, value) {
            return access(this, function (elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            if (typeof state === 'boolean') {
                return state ? this.show() : this.hide();
            }
            return this.each(function () {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;
                if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, '');
                return !result || result === 'auto' ? 0 : result;
            },
            set: function (tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: 'swing'
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    function createFxNow() {
        window.setTimeout(function () {
            fxNow = undefined;
        });
        return fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, attrs = { height: type }, i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs['margin' + which] = attrs['padding' + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners['*']), index = 0, length = collection.length;
        for (; index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, 'fxshow');
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, 'fx');
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function () {
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, 'fx').length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
            opts.overflow = [
                style.overflow,
                style.overflowX,
                style.overflowY
            ];
            display = jQuery.css(elem, 'display');
            checkDisplay = display === 'none' ? jQuery._data(elem, 'olddisplay') || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === 'inline' && jQuery.css(elem, 'float') === 'none') {
                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === 'inline') {
                    style.display = 'inline-block';
                } else {
                    style.zoom = 1;
                }
            }
        }
        if (opts.overflow) {
            style.overflow = 'hidden';
            if (!support.shrinkWrapBlocks()) {
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === 'toggle';
                if (value === (hidden ? 'hide' : 'show')) {
                    if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            } else {
                display = undefined;
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ('hidden' in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data(elem, 'fxshow', {});
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function () {
                    jQuery(elem).hide();
                });
            }
            anim.done(function () {
                var prop;
                jQuery._removeData(elem, 'fxshow');
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
                    }
                }
            }
        } else if ((display === 'none' ? defaultDisplay(elem.nodeName) : display) === 'inline') {
            style.display = display;
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && 'expand' in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function () {
                delete tick.elem;
            }), tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [
                    animation,
                    percent,
                    remaining
                ]);
                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [
                            animation,
                            1,
                            0
                        ]);
                        deferred.resolveWith(elem, [
                            animation,
                            gotoEnd
                        ]);
                    } else {
                        deferred.rejectWith(elem, [
                            animation,
                            gotoEnd
                        ]);
                    }
                    return this;
                }
            }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (jQuery.isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
                }
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            '*': [function (prop, value) {
                    var tween = this.createTween(prop, value);
                    adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                    return tween;
                }]
        },
        tweener: function (props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ['*'];
            } else {
                props = props.match(rnotwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },
        prefilters: [defaultPrefilter],
        prefilter: function (callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            } else {
                Animation.prefilters.push(callback);
            }
        }
    });
    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = 'fx';
        }
        opt.old = opt.complete;
        opt.complete = function () {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {
            return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty || jQuery._data(this, 'finish')) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== 'string') {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || 'fx', []);
            }
            return this.each(function () {
                var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || 'fx';
            }
            return this.each(function () {
                var index, data = jQuery._data(this), queue = data[type + 'queue'], hooks = data[type + 'queueHooks'], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each([
        'toggle',
        'show',
        'hide'
    ], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === 'boolean' ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.each({
        slideDown: genFx('show'),
        slideUp: genFx('hide'),
        slideToggle: genFx('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function () {
        var timer, timers = jQuery.timers, i = 0;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (!timerId) {
            timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function () {
        window.clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || 'fx';
        return this.queue(type, function (next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function () {
                window.clearTimeout(timeout);
            };
        });
    };
    (function () {
        var a, input = document.createElement('input'), div = document.createElement('div'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
        div = document.createElement('div');
        div.setAttribute('className', 't');
        div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
        a = div.getElementsByTagName('a')[0];
        input.setAttribute('type', 'checkbox');
        div.appendChild(input);
        a = div.getElementsByTagName('a')[0];
        a.style.cssText = 'top:1px';
        support.getSetAttribute = div.className !== 't';
        support.style = /top/.test(a.getAttribute('style'));
        support.hrefNormalized = a.getAttribute('href') === '/a';
        support.checkOn = !!input.value;
        support.optSelected = opt.selected;
        support.enctype = !!document.createElement('form').enctype;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement('input');
        input.setAttribute('value', '');
        support.input = input.getAttribute('value') === '';
        input.value = 't';
        input.setAttribute('type', 'radio');
        support.radioValue = input.value === 't';
    }());
    var rreturn = /\r/g, rspaces = /[\x20\t\r\n\f]+/g;
    jQuery.fn.extend({
        val: function (value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function (i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = '';
                } else if (typeof val === 'number') {
                    val += '';
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? '' : value + '';
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = jQuery.find.attr(elem, 'value');
                    return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, ' ');
                }
            },
            select: {
                get: function (elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function (elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                            try {
                                option.selected = optionSet = true;
                            } catch (_) {
                                option.scrollHeight;
                            }
                        } else {
                            option.selected = false;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return options;
                }
            }
        }
    });
    jQuery.each([
        'radio',
        'checkbox'
    ], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (jQuery.isArray(value)) {
                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function (elem) {
                return elem.getAttribute('value') === null ? 'on' : elem.value;
            };
        }
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function (elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === 'undefined') {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }
                if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                elem.setAttribute(name, value + '');
                return value;
            }
            if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            ret = jQuery.find.attr(elem, name);
            return ret == null ? undefined : ret;
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
                        var val = elem.value;
                        elem.setAttribute('type', value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },
        removeAttr: function (elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while (name = attrNames[i++]) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false;
                        } else {
                            elem[jQuery.camelCase('default-' + name)] = elem[propName] = false;
                        }
                    } else {
                        jQuery.attr(elem, name, '');
                    }
                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        }
    });
    boolHook = {
        set: function (elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
            } else {
                elem[jQuery.camelCase('default-' + name)] = elem[name] = true;
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
            attrHandle[name] = function (elem, name, isXML) {
                var ret, handle;
                if (!isXML) {
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                    attrHandle[name] = handle;
                }
                return ret;
            };
        } else {
            attrHandle[name] = function (elem, name, isXML) {
                if (!isXML) {
                    return elem[jQuery.camelCase('default-' + name)] ? name.toLowerCase() : null;
                }
            };
        }
    });
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function (elem, value, name) {
                if (jQuery.nodeName(elem, 'input')) {
                    elem.defaultValue = value;
                } else {
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }
    if (!getSetAttribute) {
        nodeHook = {
            set: function (elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
                }
                ret.value = value += '';
                if (name === 'value' || value === elem.getAttribute(name)) {
                    return value;
                }
            }
        };
        attrHandle.id = attrHandle.name = attrHandle.coords = function (elem, name, isXML) {
            var ret;
            if (!isXML) {
                return (ret = elem.getAttributeNode(name)) && ret.value !== '' ? ret.value : null;
            }
        };
        jQuery.valHooks.button = {
            get: function (elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };
        jQuery.attrHooks.contenteditable = {
            set: function (elem, value, name) {
                nodeHook.set(elem, value === '' ? false : value, name);
            }
        };
        jQuery.each([
            'width',
            'height'
        ], function (i, name) {
            jQuery.attrHooks[name] = {
                set: function (elem, value) {
                    if (value === '') {
                        elem.setAttribute(name, 'auto');
                        return value;
                    }
                }
            };
        });
    }
    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function (elem) {
                return elem.style.cssText || undefined;
            },
            set: function (elem, value) {
                return elem.style.cssText = value + '';
            }
        };
    }
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function (name) {
            name = jQuery.propFix[name] || name;
            return this.each(function () {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {
                }
            });
        }
    });
    jQuery.extend({
        prop: function (elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                return elem[name] = value;
            }
            if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            return elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function (elem) {
                    var tabindex = jQuery.find.attr(elem, 'tabindex');
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        },
        propFix: {
            'for': 'htmlFor',
            'class': 'className'
        }
    });
    if (!support.hrefNormalized) {
        jQuery.each([
            'href',
            'src'
        ], function (i, name) {
            jQuery.propHooks[name] = {
                get: function (elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            },
            set: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }
    jQuery.each([
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable'
    ], function () {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    if (!support.enctype) {
        jQuery.propFix.enctype = 'encoding';
    }
    var rclass = /[\t\r\n\f]/g;
    function getClass(elem) {
        return jQuery.attr(elem, 'class') || '';
    }
    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }
            if (typeof value === 'string' && value) {
                classes = value.match(rnotwhite) || [];
                while (elem = this[i++]) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            if (cur.indexOf(' ' + clazz + ' ') < 0) {
                                cur += clazz + ' ';
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (curValue !== finalValue) {
                            jQuery.attr(elem, 'class', finalValue);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }
            if (!arguments.length) {
                return this.attr('class', '');
            }
            if (typeof value === 'string' && value) {
                classes = value.match(rnotwhite) || [];
                while (elem = this[i++]) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            while (cur.indexOf(' ' + clazz + ' ') > -1) {
                                cur = cur.replace(' ' + clazz + ' ', ' ');
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (curValue !== finalValue) {
                            jQuery.attr(elem, 'class', finalValue);
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function (value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === 'boolean' && type === 'string') {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                });
            }
            return this.each(function () {
                var className, i, self, classNames;
                if (type === 'string') {
                    i = 0;
                    self = jQuery(this);
                    classNames = value.match(rnotwhite) || [];
                    while (className = classNames[i++]) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (value === undefined || type === 'boolean') {
                    className = getClass(this);
                    if (className) {
                        jQuery._data(this, '__className__', className);
                    }
                    jQuery.attr(this, 'class', className || value === false ? '' : jQuery._data(this, '__className__') || '');
                }
            });
        },
        hasClass: function (selector) {
            var className, elem, i = 0;
            className = ' ' + selector + ' ';
            while (elem = this[i++]) {
                if (elem.nodeType === 1 && (' ' + getClass(elem) + ' ').replace(rclass, ' ').indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        }
    });
    jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    var location = window.location;
    var nonce = jQuery.now();
    var rquery = /\?/;
    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function (data) {
        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data + '');
        }
        var requireNonComma, depth = null, str = jQuery.trim(data + '');
        return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {
            if (requireNonComma && comma) {
                depth = 0;
            }
            if (depth === 0) {
                return token;
            }
            requireNonComma = open || comma;
            depth += !close - !open;
            return '';
        })) ? Function('return ' + str)() : jQuery.error('Invalid JSON: ' + data);
    };
    jQuery.parseXML = function (data) {
        var xml, tmp;
        if (!data || typeof data !== 'string') {
            return null;
        }
        try {
            if (window.DOMParser) {
                tmp = new window.DOMParser();
                xml = tmp.parseFromString(data, 'text/xml');
            } else {
                xml = new window.ActiveXObject('Microsoft.XMLDOM');
                xml.async = 'false';
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
            jQuery.error('Invalid XML: ' + data);
        }
        return xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = '*/'.concat('*'), ajaxLocation = location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            if (typeof dataTypeExpression !== 'string') {
                func = dataTypeExpression;
                dataTypeExpression = '*';
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while (dataType = dataTypes[i++]) {
                    if (dataType.charAt(0) === '+') {
                        dataType = dataType.slice(1) || '*';
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === '*') {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === '*') {
                    current = prev;
                } else if (prev !== '*' && prev !== current) {
                    conv = converters[prev + ' ' + current] || converters['* ' + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(' ');
                            if (tmp[1] === current) {
                                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s['throws']) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: 'parsererror',
                                    error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: 'success',
            data: response
        };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: 'GET',
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            accepts: {
                '*': allTypes,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
            },
            converters: {
                '* text': String,
                'text html': true,
                'text json': jQuery.parseJSON,
                'text xml': jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function (target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            if (typeof url === 'object') {
                options = url;
                url = undefined;
            }
            options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
                    readyState: 0,
                    getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while (match = rheaders.exec(responseHeadersString)) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    },
                    setRequestHeader: function (name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [
                                        statusCode[code],
                                        map[code]
                                    ];
                                }
                            } else {
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().match(rnotwhite) || [''];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !== (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443'))));
            }
            if (s.data && s.processData && typeof s.data !== 'string') {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger('ajaxStart');
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? '&' : '?') + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, '$1_=' + nonce++) : cacheURL + (rquery.test(cacheURL) ? '&' : '?') + '_=' + nonce++;
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader('Content-Type', s.contentType);
            }
            jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = 'abort';
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, 'No Transport');
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger('ajaxSend', [
                        jqXHR,
                        s
                    ]);
                }
                if (state === 2) {
                    return jqXHR;
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function () {
                        jqXHR.abort('timeout');
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || '';
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader('Last-Modified');
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader('etag');
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === 'HEAD') {
                        statusText = 'nocontent';
                    } else if (status === 304) {
                        statusText = 'notmodified';
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = 'error';
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + '';
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [
                        success,
                        statusText,
                        jqXHR
                    ]);
                } else {
                    deferred.rejectWith(callbackContext, [
                        jqXHR,
                        statusText,
                        error
                    ]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
                        jqXHR,
                        s,
                        isSuccess ? success : error
                    ]);
                }
                completeDeferred.fireWith(callbackContext, [
                    jqXHR,
                    statusText
                ]);
                if (fireGlobals) {
                    globalEventContext.trigger('ajaxComplete', [
                        jqXHR,
                        s
                    ]);
                    if (!--jQuery.active) {
                        jQuery.event.trigger('ajaxStop');
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, 'json');
        },
        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, 'script');
        }
    });
    jQuery.each([
        'get',
        'post'
    ], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    });
    jQuery._evalUrl = function (url) {
        return jQuery.ajax({
            url: url,
            type: 'GET',
            dataType: 'script',
            cache: true,
            async: false,
            global: false,
            'throws': true
        });
    };
    jQuery.fn.extend({
        wrapAll: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function (html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, 'body')) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    function getDisplay(elem) {
        return elem.style && elem.style.display || jQuery.css(elem, 'display');
    }
    function filterHidden(elem) {
        while (elem && elem.nodeType === 1) {
            if (getDisplay(elem) === 'none' || elem.type === 'hidden') {
                return true;
            }
            elem = elem.parentNode;
        }
        return false;
    }
    jQuery.expr.filters.hidden = function (elem) {
        return support.reliableHiddenOffsets() ? elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && !elem.getClientRects().length : filterHidden(elem);
    };
    jQuery.expr.filters.visible = function (elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']', v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === 'object') {
            for (name in obj) {
                buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.param = function (a, traditional) {
        var prefix, s = [], add = function (key, value) {
                value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
                s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function () {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join('&').replace(r20, '+');
    };
    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var elements = jQuery.prop(this, 'elements');
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function () {
                var type = this.type;
                return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function (i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, '\r\n')
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, '\r\n')
                };
            }).get();
        }
    });
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ? function () {
        if (this.isLocal) {
            return createActiveXHR();
        }
        if (document.documentMode > 8) {
            return createStandardXHR();
        }
        return /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.attachEvent) {
        window.attachEvent('onunload', function () {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }
    support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
    xhrSupported = support.ajax = !!xhrSupported;
    if (xhrSupported) {
        jQuery.ajaxTransport(function (options) {
            if (!options.crossDomain || support.cors) {
                var callback;
                return {
                    send: function (headers, complete) {
                        var i, xhr = options.xhr(), id = ++xhrId;
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        if (!options.crossDomain && !headers['X-Requested-With']) {
                            headers['X-Requested-With'] = 'XMLHttpRequest';
                        }
                        for (i in headers) {
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + '');
                            }
                        }
                        xhr.send(options.hasContent && options.data || null);
                        callback = function (_, isAbort) {
                            var status, statusText, responses;
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;
                                    if (typeof xhr.responseText === 'string') {
                                        responses.text = xhr.responseText;
                                    }
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        statusText = '';
                                    }
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };
                        if (!options.async) {
                            callback();
                        } else if (xhr.readyState === 4) {
                            window.setTimeout(callback);
                        } else {
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {
        }
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {
        }
    }
    jQuery.ajaxSetup({
        accepts: { script: 'text/javascript, application/javascript, ' + 'application/ecmascript, application/x-ecmascript' },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
            'text script': function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter('script', function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = 'GET';
            s.global = false;
        }
    });
    jQuery.ajaxTransport('script', function (s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery('head')[0] || document.documentElement;
            return {
                send: function (_, callback) {
                    script = document.createElement('script');
                    script.async = true;
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function (_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }
                            script = null;
                            if (!isAbort) {
                                callback(200, 'success');
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function () {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && rjsonp.test(s.data) && 'data');
        if (jsonProp || s.dataTypes[0] === 'jsonp') {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
            }
            s.converters['script json'] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + ' was not called');
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = 'json';
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };
            jqXHR.always(function () {
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);
                } else {
                    window[callbackName] = overwritten;
                }
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return 'script';
        }
    });
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (!data || typeof data !== 'string') {
            return null;
        }
        if (typeof context === 'boolean') {
            keepScripts = context;
            context = false;
        }
        context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        if (parsed) {
            return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function (url, params, callback) {
        if (typeof url !== 'string' && _load) {
            return _load.apply(this, arguments);
        }
        var selector, type, response, self = this, off = url.indexOf(' ');
        if (off > -1) {
            selector = jQuery.trim(url.slice(off, url.length));
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === 'object') {
            type = 'POST';
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type || 'GET',
                dataType: 'html',
                data: params
            }).done(function (responseText) {
                response = arguments;
                self.html(selector ? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [
                        jqXHR.responseText,
                        status,
                        jqXHR
                    ]);
                });
            });
        }
        return this;
    };
    jQuery.each([
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend'
    ], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });
    jQuery.expr.filters.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem;
        }).length;
    };
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, 'position'), curElem = jQuery(elem), props = {};
            if (position === 'static') {
                elem.style.position = 'relative';
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, 'top');
            curCSSLeft = jQuery.css(elem, 'left');
            calculatePosition = (position === 'absolute' || position === 'fixed') && jQuery.inArray('auto', [
                curCSSTop,
                curCSSLeft
            ]) > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }
            if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
            }
            if ('using' in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function (options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var docElem, win, box = {
                    top: 0,
                    left: 0
                }, elem = this[0], doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }
            if (typeof elem.getBoundingClientRect !== 'undefined') {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        },
        position: function () {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
            if (jQuery.css(elem, 'position') === 'fixed') {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], 'html')) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
                parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
                left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent;
                while (offsetParent && (!jQuery.nodeName(offsetParent, 'html') && jQuery.css(offsetParent, 'position') === 'static')) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || documentElement;
            });
        }
    });
    jQuery.each({
        scrollLeft: 'pageXOffset',
        scrollTop: 'pageYOffset'
    }, function (method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function (val) {
            return access(this, function (elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });
    jQuery.each([
        'top',
        'left'
    ], function (i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
            }
        });
    });
    jQuery.each({
        Height: 'height',
        Width: 'width'
    }, function (name, type) {
        jQuery.each({
            padding: 'inner' + name,
            content: type,
            '': 'outer' + name
        }, function (defaultExtra, funcName) {
            jQuery.fn[funcName] = function (margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
                return access(this, function (elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement['client' + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.extend({
        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
        }
    });
    jQuery.fn.size = function () {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === 'function' && define.amd) {
        define('jquery', [], function () {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}));
define('affix', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Affix = function (element, options) {
            this.options = $.extend({}, Affix.DEFAULTS, options);
            this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
            this.$element = $(element);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition();
        };
        Affix.VERSION = '3.3.6';
        Affix.RESET = 'affix affix-top affix-bottom';
        Affix.DEFAULTS = {
            offset: 0,
            target: window
        };
        Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
            var scrollTop = this.$target.scrollTop();
            var position = this.$element.offset();
            var targetHeight = this.$target.height();
            if (offsetTop != null && this.affixed == 'top')
                return scrollTop < offsetTop ? 'top' : false;
            if (this.affixed == 'bottom') {
                if (offsetTop != null)
                    return scrollTop + this.unpin <= position.top ? false : 'bottom';
                return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
            }
            var initializing = this.affixed == null;
            var colliderTop = initializing ? scrollTop : position.top;
            var colliderHeight = initializing ? targetHeight : height;
            if (offsetTop != null && scrollTop <= offsetTop)
                return 'top';
            if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom)
                return 'bottom';
            return false;
        };
        Affix.prototype.getPinnedOffset = function () {
            if (this.pinnedOffset)
                return this.pinnedOffset;
            this.$element.removeClass(Affix.RESET).addClass('affix');
            var scrollTop = this.$target.scrollTop();
            var position = this.$element.offset();
            return this.pinnedOffset = position.top - scrollTop;
        };
        Affix.prototype.checkPositionWithEventLoop = function () {
            setTimeout($.proxy(this.checkPosition, this), 1);
        };
        Affix.prototype.checkPosition = function () {
            if (!this.$element.is(':visible'))
                return;
            var height = this.$element.height();
            var offset = this.options.offset;
            var offsetTop = offset.top;
            var offsetBottom = offset.bottom;
            var scrollHeight = Math.max($(document).height(), $(document.body).height());
            if (typeof offset != 'object')
                offsetBottom = offsetTop = offset;
            if (typeof offsetTop == 'function')
                offsetTop = offset.top(this.$element);
            if (typeof offsetBottom == 'function')
                offsetBottom = offset.bottom(this.$element);
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                if (this.unpin != null)
                    this.$element.css('top', '');
                var affixType = 'affix' + (affix ? '-' + affix : '');
                var e = $.Event(affixType + '.bs.affix');
                this.$element.trigger(e);
                if (e.isDefaultPrevented())
                    return;
                this.affixed = affix;
                this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
            }
            if (affix == 'bottom') {
                this.$element.offset({ top: scrollHeight - height - offsetBottom });
            }
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.affix');
                var options = typeof option == 'object' && option;
                if (!data)
                    $this.data('bs.affix', data = new Affix(this, options));
                if (typeof option == 'string')
                    data[option]();
            });
        }
        var old = $.fn.affix;
        $.fn.affix = Plugin;
        $.fn.affix.Constructor = Affix;
        $.fn.affix.noConflict = function () {
            $.fn.affix = old;
            return this;
        };
        $(window).on('load', function () {
            $('[data-spy="affix"]').each(function () {
                var $spy = $(this);
                var data = $spy.data();
                data.offset = data.offset || {};
                if (data.offsetBottom != null)
                    data.offset.bottom = data.offsetBottom;
                if (data.offsetTop != null)
                    data.offset.top = data.offsetTop;
                Plugin.call($spy, data);
            });
        });
    }(jQuery);
    return $.fn.affix;
});
define('alert', ['jquery'], function () {
    +function ($) {
        'use strict';
        var dismiss = '[data-dismiss="alert"]';
        var Alert = function (el) {
            $(el).on('click', dismiss, this.close);
        };
        Alert.VERSION = '3.3.6';
        Alert.TRANSITION_DURATION = 150;
        Alert.prototype.close = function (e) {
            var $this = $(this);
            var selector = $this.attr('data-target');
            if (!selector) {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
            }
            var $parent = $(selector);
            if (e)
                e.preventDefault();
            if (!$parent.length) {
                $parent = $this.closest('.alert');
            }
            $parent.trigger(e = $.Event('close.bs.alert'));
            if (e.isDefaultPrevented())
                return;
            $parent.removeClass('in');
            function removeElement() {
                $parent.detach().trigger('closed.bs.alert').remove();
            }
            $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.alert');
                if (!data)
                    $this.data('bs.alert', data = new Alert(this));
                if (typeof option == 'string')
                    data[option].call($this);
            });
        }
        var old = $.fn.alert;
        $.fn.alert = Plugin;
        $.fn.alert.Constructor = Alert;
        $.fn.alert.noConflict = function () {
            $.fn.alert = old;
            return this;
        };
        $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
    }(jQuery);
    return $.fn.alert;
});
define('button', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Button = function (element, options) {
            this.$element = $(element);
            this.options = $.extend({}, Button.DEFAULTS, options);
            this.isLoading = false;
        };
        Button.VERSION = '3.3.6';
        Button.DEFAULTS = { loadingText: 'loading...' };
        Button.prototype.setState = function (state) {
            var d = 'disabled';
            var $el = this.$element;
            var val = $el.is('input') ? 'val' : 'html';
            var data = $el.data();
            state += 'Text';
            if (data.resetText == null)
                $el.data('resetText', $el[val]());
            setTimeout($.proxy(function () {
                $el[val](data[state] == null ? this.options[state] : data[state]);
                if (state == 'loadingText') {
                    this.isLoading = true;
                    $el.addClass(d).attr(d, d);
                } else if (this.isLoading) {
                    this.isLoading = false;
                    $el.removeClass(d).removeAttr(d);
                }
            }, this), 0);
        };
        Button.prototype.toggle = function () {
            var changed = true;
            var $parent = this.$element.closest('[data-toggle="buttons"]');
            if ($parent.length) {
                var $input = this.$element.find('input');
                if ($input.prop('type') == 'radio') {
                    if ($input.prop('checked'))
                        changed = false;
                    $parent.find('.active').removeClass('active');
                    this.$element.addClass('active');
                } else if ($input.prop('type') == 'checkbox') {
                    if ($input.prop('checked') !== this.$element.hasClass('active'))
                        changed = false;
                    this.$element.toggleClass('active');
                }
                $input.prop('checked', this.$element.hasClass('active'));
                if (changed)
                    $input.trigger('change');
            } else {
                this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
                this.$element.toggleClass('active');
            }
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.button');
                var options = typeof option == 'object' && option;
                if (!data)
                    $this.data('bs.button', data = new Button(this, options));
                if (option == 'toggle')
                    data.toggle();
                else if (option)
                    data.setState(option);
            });
        }
        var old = $.fn.button;
        $.fn.button = Plugin;
        $.fn.button.Constructor = Button;
        $.fn.button.noConflict = function () {
            $.fn.button = old;
            return this;
        };
        $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            var $btn = $(e.target);
            if (!$btn.hasClass('btn'))
                $btn = $btn.closest('.btn');
            Plugin.call($btn, 'toggle');
            if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]')))
                e.preventDefault();
        }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
        });
    }(jQuery);
    return $.fn.button;
});
define('carousel', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Carousel = function (element, options) {
            this.$element = $(element);
            this.$indicators = this.$element.find('.carousel-indicators');
            this.options = options;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));
            this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
        };
        Carousel.VERSION = '3.3.6';
        Carousel.TRANSITION_DURATION = 600;
        Carousel.DEFAULTS = {
            interval: 5000,
            pause: 'hover',
            wrap: true,
            keyboard: true
        };
        Carousel.prototype.keydown = function (e) {
            if (/input|textarea/i.test(e.target.tagName))
                return;
            switch (e.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return;
            }
            e.preventDefault();
        };
        Carousel.prototype.cycle = function (e) {
            e || (this.paused = false);
            this.interval && clearInterval(this.interval);
            this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
            return this;
        };
        Carousel.prototype.getItemIndex = function (item) {
            this.$items = item.parent().children('.item');
            return this.$items.index(item || this.$active);
        };
        Carousel.prototype.getItemForDirection = function (direction, active) {
            var activeIndex = this.getItemIndex(active);
            var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
            if (willWrap && !this.options.wrap)
                return active;
            var delta = direction == 'prev' ? -1 : 1;
            var itemIndex = (activeIndex + delta) % this.$items.length;
            return this.$items.eq(itemIndex);
        };
        Carousel.prototype.to = function (pos) {
            var that = this;
            var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));
            if (pos > this.$items.length - 1 || pos < 0)
                return;
            if (this.sliding)
                return this.$element.one('slid.bs.carousel', function () {
                    that.to(pos);
                });
            if (activeIndex == pos)
                return this.pause().cycle();
            return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
        };
        Carousel.prototype.pause = function (e) {
            e || (this.paused = true);
            if (this.$element.find('.next, .prev').length && $.support.transition) {
                this.$element.trigger($.support.transition.end);
                this.cycle(true);
            }
            this.interval = clearInterval(this.interval);
            return this;
        };
        Carousel.prototype.next = function () {
            if (this.sliding)
                return;
            return this.slide('next');
        };
        Carousel.prototype.prev = function () {
            if (this.sliding)
                return;
            return this.slide('prev');
        };
        Carousel.prototype.slide = function (type, next) {
            var $active = this.$element.find('.item.active');
            var $next = next || this.getItemForDirection(type, $active);
            var isCycling = this.interval;
            var direction = type == 'next' ? 'left' : 'right';
            var that = this;
            if ($next.hasClass('active'))
                return this.sliding = false;
            var relatedTarget = $next[0];
            var slideEvent = $.Event('slide.bs.carousel', {
                relatedTarget: relatedTarget,
                direction: direction
            });
            this.$element.trigger(slideEvent);
            if (slideEvent.isDefaultPrevented())
                return;
            this.sliding = true;
            isCycling && this.pause();
            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active');
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass('active');
            }
            var slidEvent = $.Event('slid.bs.carousel', {
                relatedTarget: relatedTarget,
                direction: direction
            });
            if ($.support.transition && this.$element.hasClass('slide')) {
                $next.addClass(type);
                $next[0].offsetWidth;
                $active.addClass(direction);
                $next.addClass(direction);
                $active.one('bsTransitionEnd', function () {
                    $next.removeClass([
                        type,
                        direction
                    ].join(' ')).addClass('active');
                    $active.removeClass([
                        'active',
                        direction
                    ].join(' '));
                    that.sliding = false;
                    setTimeout(function () {
                        that.$element.trigger(slidEvent);
                    }, 0);
                }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
            } else {
                $active.removeClass('active');
                $next.addClass('active');
                this.sliding = false;
                this.$element.trigger(slidEvent);
            }
            isCycling && this.cycle();
            return this;
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.carousel');
                var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
                var action = typeof option == 'string' ? option : options.slide;
                if (!data)
                    $this.data('bs.carousel', data = new Carousel(this, options));
                if (typeof option == 'number')
                    data.to(option);
                else if (action)
                    data[action]();
                else if (options.interval)
                    data.pause().cycle();
            });
        }
        var old = $.fn.carousel;
        $.fn.carousel = Plugin;
        $.fn.carousel.Constructor = Carousel;
        $.fn.carousel.noConflict = function () {
            $.fn.carousel = old;
            return this;
        };
        var clickHandler = function (e) {
            var href;
            var $this = $(this);
            var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
            if (!$target.hasClass('carousel'))
                return;
            var options = $.extend({}, $target.data(), $this.data());
            var slideIndex = $this.attr('data-slide-to');
            if (slideIndex)
                options.interval = false;
            Plugin.call($target, options);
            if (slideIndex) {
                $target.data('bs.carousel').to(slideIndex);
            }
            e.preventDefault();
        };
        $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
        $(window).on('load', function () {
            $('[data-ride="carousel"]').each(function () {
                var $carousel = $(this);
                Plugin.call($carousel, $carousel.data());
            });
        });
    }(jQuery);
    return $.fn.carousel;
});
define('collapse', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Collapse = function (element, options) {
            this.$element = $(element);
            this.options = $.extend({}, Collapse.DEFAULTS, options);
            this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
            this.transitioning = null;
            if (this.options.parent) {
                this.$parent = this.getParent();
            } else {
                this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            }
            if (this.options.toggle)
                this.toggle();
        };
        Collapse.VERSION = '3.3.6';
        Collapse.TRANSITION_DURATION = 350;
        Collapse.DEFAULTS = { toggle: true };
        Collapse.prototype.dimension = function () {
            var hasWidth = this.$element.hasClass('width');
            return hasWidth ? 'width' : 'height';
        };
        Collapse.prototype.show = function () {
            if (this.transitioning || this.$element.hasClass('in'))
                return;
            var activesData;
            var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
            if (actives && actives.length) {
                activesData = actives.data('bs.collapse');
                if (activesData && activesData.transitioning)
                    return;
            }
            var startEvent = $.Event('show.bs.collapse');
            this.$element.trigger(startEvent);
            if (startEvent.isDefaultPrevented())
                return;
            if (actives && actives.length) {
                Plugin.call(actives, 'hide');
                activesData || actives.data('bs.collapse', null);
            }
            var dimension = this.dimension();
            this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);
            this.$trigger.removeClass('collapsed').attr('aria-expanded', true);
            this.transitioning = 1;
            var complete = function () {
                this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
                this.transitioning = 0;
                this.$element.trigger('shown.bs.collapse');
            };
            if (!$.support.transition)
                return complete.call(this);
            var scrollSize = $.camelCase([
                'scroll',
                dimension
            ].join('-'));
            this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
        };
        Collapse.prototype.hide = function () {
            if (this.transitioning || !this.$element.hasClass('in'))
                return;
            var startEvent = $.Event('hide.bs.collapse');
            this.$element.trigger(startEvent);
            if (startEvent.isDefaultPrevented())
                return;
            var dimension = this.dimension();
            this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
            this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);
            this.$trigger.addClass('collapsed').attr('aria-expanded', false);
            this.transitioning = 1;
            var complete = function () {
                this.transitioning = 0;
                this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
            };
            if (!$.support.transition)
                return complete.call(this);
            this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
        };
        Collapse.prototype.toggle = function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']();
        };
        Collapse.prototype.getParent = function () {
            return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
                var $element = $(element);
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
            }, this)).end();
        };
        Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
            var isOpen = $element.hasClass('in');
            $element.attr('aria-expanded', isOpen);
            $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
        };
        function getTargetFromTrigger($trigger) {
            var href;
            var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
            return $(target);
        }
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.collapse');
                var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
                if (!data && options.toggle && /show|hide/.test(option))
                    options.toggle = false;
                if (!data)
                    $this.data('bs.collapse', data = new Collapse(this, options));
                if (typeof option == 'string')
                    data[option]();
            });
        }
        var old = $.fn.collapse;
        $.fn.collapse = Plugin;
        $.fn.collapse.Constructor = Collapse;
        $.fn.collapse.noConflict = function () {
            $.fn.collapse = old;
            return this;
        };
        $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
            var $this = $(this);
            if (!$this.attr('data-target'))
                e.preventDefault();
            var $target = getTargetFromTrigger($this);
            var data = $target.data('bs.collapse');
            var option = data ? 'toggle' : $this.data();
            Plugin.call($target, option);
        });
    }(jQuery);
    return $.fn.collapse;
});
define('dropdown', ['jquery'], function () {
    +function ($) {
        'use strict';
        var backdrop = '.dropdown-backdrop';
        var toggle = '[data-toggle="dropdown"]';
        var Dropdown = function (element) {
            $(element).on('click.bs.dropdown', this.toggle);
        };
        Dropdown.VERSION = '3.3.6';
        function getParent($this) {
            var selector = $this.attr('data-target');
            if (!selector) {
                selector = $this.attr('href');
                selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
            }
            var $parent = selector && $(selector);
            return $parent && $parent.length ? $parent : $this.parent();
        }
        function clearMenus(e) {
            if (e && e.which === 3)
                return;
            $(backdrop).remove();
            $(toggle).each(function () {
                var $this = $(this);
                var $parent = getParent($this);
                var relatedTarget = { relatedTarget: this };
                if (!$parent.hasClass('open'))
                    return;
                if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target))
                    return;
                $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
                if (e.isDefaultPrevented())
                    return;
                $this.attr('aria-expanded', 'false');
                $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
            });
        }
        Dropdown.prototype.toggle = function (e) {
            var $this = $(this);
            if ($this.is('.disabled, :disabled'))
                return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass('open');
            clearMenus();
            if (!isActive) {
                if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                    $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
                }
                var relatedTarget = { relatedTarget: this };
                $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
                if (e.isDefaultPrevented())
                    return;
                $this.trigger('focus').attr('aria-expanded', 'true');
                $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
            }
            return false;
        };
        Dropdown.prototype.keydown = function (e) {
            if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName))
                return;
            var $this = $(this);
            e.preventDefault();
            e.stopPropagation();
            if ($this.is('.disabled, :disabled'))
                return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass('open');
            if (!isActive && e.which != 27 || isActive && e.which == 27) {
                if (e.which == 27)
                    $parent.find(toggle).trigger('focus');
                return $this.trigger('click');
            }
            var desc = ' li:not(.disabled):visible a';
            var $items = $parent.find('.dropdown-menu' + desc);
            if (!$items.length)
                return;
            var index = $items.index(e.target);
            if (e.which == 38 && index > 0)
                index--;
            if (e.which == 40 && index < $items.length - 1)
                index++;
            if (!~index)
                index = 0;
            $items.eq(index).trigger('focus');
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.dropdown');
                if (!data)
                    $this.data('bs.dropdown', data = new Dropdown(this));
                if (typeof option == 'string')
                    data[option].call($this);
            });
        }
        var old = $.fn.dropdown;
        $.fn.dropdown = Plugin;
        $.fn.dropdown.Constructor = Dropdown;
        $.fn.dropdown.noConflict = function () {
            $.fn.dropdown = old;
            return this;
        };
        $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
            e.stopPropagation();
        }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
    }(jQuery);
    return $.fn.dropdown;
});
define('modal', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Modal = function (element, options) {
            this.options = options;
            this.$body = $(document.body);
            this.$element = $(element);
            this.$dialog = this.$element.find('.modal-dialog');
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = false;
            if (this.options.remote) {
                this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal');
                }, this));
            }
        };
        Modal.VERSION = '3.3.6';
        Modal.TRANSITION_DURATION = 300;
        Modal.BACKDROP_TRANSITION_DURATION = 150;
        Modal.DEFAULTS = {
            backdrop: true,
            keyboard: true,
            show: true
        };
        Modal.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget);
        };
        Modal.prototype.show = function (_relatedTarget) {
            var that = this;
            var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });
            this.$element.trigger(e);
            if (this.isShown || e.isDefaultPrevented())
                return;
            this.isShown = true;
            this.checkScrollbar();
            this.setScrollbar();
            this.$body.addClass('modal-open');
            this.escape();
            this.resize();
            this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
            this.$dialog.on('mousedown.dismiss.bs.modal', function () {
                that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                    if ($(e.target).is(that.$element))
                        that.ignoreBackdropClick = true;
                });
            });
            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade');
                if (!that.$element.parent().length) {
                    that.$element.appendTo(that.$body);
                }
                that.$element.show().scrollTop(0);
                that.adjustDialog();
                if (transition) {
                    that.$element[0].offsetWidth;
                }
                that.$element.addClass('in');
                that.enforceFocus();
                var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });
                transition ? that.$dialog.one('bsTransitionEnd', function () {
                    that.$element.trigger('focus').trigger(e);
                }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
            });
        };
        Modal.prototype.hide = function (e) {
            if (e)
                e.preventDefault();
            e = $.Event('hide.bs.modal');
            this.$element.trigger(e);
            if (!this.isShown || e.isDefaultPrevented())
                return;
            this.isShown = false;
            this.escape();
            this.resize();
            $(document).off('focusin.bs.modal');
            this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
            this.$dialog.off('mousedown.dismiss.bs.modal');
            $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
        };
        Modal.prototype.enforceFocus = function () {
            $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function (e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus');
                }
            }, this));
        };
        Modal.prototype.escape = function () {
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                    e.which == 27 && this.hide();
                }, this));
            } else if (!this.isShown) {
                this.$element.off('keydown.dismiss.bs.modal');
            }
        };
        Modal.prototype.resize = function () {
            if (this.isShown) {
                $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
            } else {
                $(window).off('resize.bs.modal');
            }
        };
        Modal.prototype.hideModal = function () {
            var that = this;
            this.$element.hide();
            this.backdrop(function () {
                that.$body.removeClass('modal-open');
                that.resetAdjustments();
                that.resetScrollbar();
                that.$element.trigger('hidden.bs.modal');
            });
        };
        Modal.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null;
        };
        Modal.prototype.backdrop = function (callback) {
            var that = this;
            var animate = this.$element.hasClass('fade') ? 'fade' : '';
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);
                this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                    if (this.ignoreBackdropClick) {
                        this.ignoreBackdropClick = false;
                        return;
                    }
                    if (e.target !== e.currentTarget)
                        return;
                    this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
                }, this));
                if (doAnimate)
                    this.$backdrop[0].offsetWidth;
                this.$backdrop.addClass('in');
                if (!callback)
                    return;
                doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in');
                var callbackRemove = function () {
                    that.removeBackdrop();
                    callback && callback();
                };
                $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
            } else if (callback) {
                callback();
            }
        };
        Modal.prototype.handleUpdate = function () {
            this.adjustDialog();
        };
        Modal.prototype.adjustDialog = function () {
            var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
                paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
            });
        };
        Modal.prototype.resetAdjustments = function () {
            this.$element.css({
                paddingLeft: '',
                paddingRight: ''
            });
        };
        Modal.prototype.checkScrollbar = function () {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            this.scrollbarWidth = this.measureScrollbar();
        };
        Modal.prototype.setScrollbar = function () {
            var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || '';
            if (this.bodyIsOverflowing)
                this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
        };
        Modal.prototype.resetScrollbar = function () {
            this.$body.css('padding-right', this.originalBodyPad);
        };
        Modal.prototype.measureScrollbar = function () {
            var scrollDiv = document.createElement('div');
            scrollDiv.className = 'modal-scrollbar-measure';
            this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.$body[0].removeChild(scrollDiv);
            return scrollbarWidth;
        };
        function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.modal');
                var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
                if (!data)
                    $this.data('bs.modal', data = new Modal(this, options));
                if (typeof option == 'string')
                    data[option](_relatedTarget);
                else if (options.show)
                    data.show(_relatedTarget);
            });
        }
        var old = $.fn.modal;
        $.fn.modal = Plugin;
        $.fn.modal.Constructor = Modal;
        $.fn.modal.noConflict = function () {
            $.fn.modal = old;
            return this;
        };
        $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
            var $this = $(this);
            var href = $this.attr('href');
            var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, ''));
            var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());
            if ($this.is('a'))
                e.preventDefault();
            $target.one('show.bs.modal', function (showEvent) {
                if (showEvent.isDefaultPrevented())
                    return;
                $target.one('hidden.bs.modal', function () {
                    $this.is(':visible') && $this.trigger('focus');
                });
            });
            Plugin.call($target, option, this);
        });
    }(jQuery);
    return $.fn.modal;
});
define('tooltip', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Tooltip = function (element, options) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init('tooltip', element, options);
        };
        Tooltip.VERSION = '3.3.6';
        Tooltip.TRANSITION_DURATION = 150;
        Tooltip.DEFAULTS = {
            animation: true,
            placement: 'top',
            selector: false,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: false,
            container: false,
            viewport: {
                selector: 'body',
                padding: 0
            }
        };
        Tooltip.prototype.init = function (type, element, options) {
            this.enabled = true;
            this.type = type;
            this.$element = $(element);
            this.options = this.getOptions(options);
            this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
            this.inState = {
                click: false,
                hover: false,
                focus: false
            };
            if (this.$element[0] instanceof document.constructor && !this.options.selector) {
                throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
            }
            var triggers = this.options.trigger.split(' ');
            for (var i = triggers.length; i--;) {
                var trigger = triggers[i];
                if (trigger == 'click') {
                    this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
                } else if (trigger != 'manual') {
                    var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
                    var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
                    this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
                    this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
                }
            }
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            }) : this.fixTitle();
        };
        Tooltip.prototype.getDefaults = function () {
            return Tooltip.DEFAULTS;
        };
        Tooltip.prototype.getOptions = function (options) {
            options = $.extend({}, this.getDefaults(), this.$element.data(), options);
            if (options.delay && typeof options.delay == 'number') {
                options.delay = {
                    show: options.delay,
                    hide: options.delay
                };
            }
            return options;
        };
        Tooltip.prototype.getDelegateOptions = function () {
            var options = {};
            var defaults = this.getDefaults();
            this._options && $.each(this._options, function (key, value) {
                if (defaults[key] != value)
                    options[key] = value;
            });
            return options;
        };
        Tooltip.prototype.enter = function (obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
            if (!self) {
                self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                $(obj.currentTarget).data('bs.' + this.type, self);
            }
            if (obj instanceof $.Event) {
                self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
            }
            if (self.tip().hasClass('in') || self.hoverState == 'in') {
                self.hoverState = 'in';
                return;
            }
            clearTimeout(self.timeout);
            self.hoverState = 'in';
            if (!self.options.delay || !self.options.delay.show)
                return self.show();
            self.timeout = setTimeout(function () {
                if (self.hoverState == 'in')
                    self.show();
            }, self.options.delay.show);
        };
        Tooltip.prototype.isInStateTrue = function () {
            for (var key in this.inState) {
                if (this.inState[key])
                    return true;
            }
            return false;
        };
        Tooltip.prototype.leave = function (obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
            if (!self) {
                self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                $(obj.currentTarget).data('bs.' + this.type, self);
            }
            if (obj instanceof $.Event) {
                self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
            }
            if (self.isInStateTrue())
                return;
            clearTimeout(self.timeout);
            self.hoverState = 'out';
            if (!self.options.delay || !self.options.delay.hide)
                return self.hide();
            self.timeout = setTimeout(function () {
                if (self.hoverState == 'out')
                    self.hide();
            }, self.options.delay.hide);
        };
        Tooltip.prototype.show = function () {
            var e = $.Event('show.bs.' + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !inDom)
                    return;
                var that = this;
                var $tip = this.tip();
                var tipId = this.getUID(this.type);
                this.setContent();
                $tip.attr('id', tipId);
                this.$element.attr('aria-describedby', tipId);
                if (this.options.animation)
                    $tip.addClass('fade');
                var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
                var autoToken = /\s?auto?\s?/i;
                var autoPlace = autoToken.test(placement);
                if (autoPlace)
                    placement = placement.replace(autoToken, '') || 'top';
                $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: 'block'
                }).addClass(placement).data('bs.' + this.type, this);
                this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                this.$element.trigger('inserted.bs.' + this.type);
                var pos = this.getPosition();
                var actualWidth = $tip[0].offsetWidth;
                var actualHeight = $tip[0].offsetHeight;
                if (autoPlace) {
                    var orgPlacement = placement;
                    var viewportDim = this.getPosition(this.$viewport);
                    placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;
                    $tip.removeClass(orgPlacement).addClass(placement);
                }
                var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
                this.applyPlacement(calculatedOffset, placement);
                var complete = function () {
                    var prevHoverState = that.hoverState;
                    that.$element.trigger('shown.bs.' + that.type);
                    that.hoverState = null;
                    if (prevHoverState == 'out')
                        that.leave(that);
                };
                $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
            }
        };
        Tooltip.prototype.applyPlacement = function (offset, placement) {
            var $tip = this.tip();
            var width = $tip[0].offsetWidth;
            var height = $tip[0].offsetHeight;
            var marginTop = parseInt($tip.css('margin-top'), 10);
            var marginLeft = parseInt($tip.css('margin-left'), 10);
            if (isNaN(marginTop))
                marginTop = 0;
            if (isNaN(marginLeft))
                marginLeft = 0;
            offset.top += marginTop;
            offset.left += marginLeft;
            $.offset.setOffset($tip[0], $.extend({
                using: function (props) {
                    $tip.css({
                        top: Math.round(props.top),
                        left: Math.round(props.left)
                    });
                }
            }, offset), 0);
            $tip.addClass('in');
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (placement == 'top' && actualHeight != height) {
                offset.top = offset.top + height - actualHeight;
            }
            var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
            if (delta.left)
                offset.left += delta.left;
            else
                offset.top += delta.top;
            var isVertical = /top|bottom/.test(placement);
            var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
            var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
            $tip.offset(offset);
            this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
        };
        Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
            this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
        };
        Tooltip.prototype.setContent = function () {
            var $tip = this.tip();
            var title = this.getTitle();
            $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
            $tip.removeClass('fade in top bottom left right');
        };
        Tooltip.prototype.hide = function (callback) {
            var that = this;
            var $tip = $(this.$tip);
            var e = $.Event('hide.bs.' + this.type);
            function complete() {
                if (that.hoverState != 'in')
                    $tip.detach();
                that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
                callback && callback();
            }
            this.$element.trigger(e);
            if (e.isDefaultPrevented())
                return;
            $tip.removeClass('in');
            $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
            this.hoverState = null;
            return this;
        };
        Tooltip.prototype.fixTitle = function () {
            var $e = this.$element;
            if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
                $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
            }
        };
        Tooltip.prototype.hasContent = function () {
            return this.getTitle();
        };
        Tooltip.prototype.getPosition = function ($element) {
            $element = $element || this.$element;
            var el = $element[0];
            var isBody = el.tagName == 'BODY';
            var elRect = el.getBoundingClientRect();
            if (elRect.width == null) {
                elRect = $.extend({}, elRect, {
                    width: elRect.right - elRect.left,
                    height: elRect.bottom - elRect.top
                });
            }
            var elOffset = isBody ? {
                top: 0,
                left: 0
            } : $element.offset();
            var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
            var outerDims = isBody ? {
                width: $(window).width(),
                height: $(window).height()
            } : null;
            return $.extend({}, elRect, scroll, outerDims, elOffset);
        };
        Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
            return placement == 'bottom' ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : placement == 'top' ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : placement == 'left' ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } : {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            };
        };
        Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
            var delta = {
                top: 0,
                left: 0
            };
            if (!this.$viewport)
                return delta;
            var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
            var viewportDimensions = this.getPosition(this.$viewport);
            if (/right|left/.test(placement)) {
                var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
                var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
                if (topEdgeOffset < viewportDimensions.top) {
                    delta.top = viewportDimensions.top - topEdgeOffset;
                } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                    delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
                }
            } else {
                var leftEdgeOffset = pos.left - viewportPadding;
                var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
                if (leftEdgeOffset < viewportDimensions.left) {
                    delta.left = viewportDimensions.left - leftEdgeOffset;
                } else if (rightEdgeOffset > viewportDimensions.right) {
                    delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
                }
            }
            return delta;
        };
        Tooltip.prototype.getTitle = function () {
            var title;
            var $e = this.$element;
            var o = this.options;
            title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
            return title;
        };
        Tooltip.prototype.getUID = function (prefix) {
            do
                prefix += ~~(Math.random() * 1000000);
            while (document.getElementById(prefix));
            return prefix;
        };
        Tooltip.prototype.tip = function () {
            if (!this.$tip) {
                this.$tip = $(this.options.template);
                if (this.$tip.length != 1) {
                    throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
                }
            }
            return this.$tip;
        };
        Tooltip.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
        };
        Tooltip.prototype.enable = function () {
            this.enabled = true;
        };
        Tooltip.prototype.disable = function () {
            this.enabled = false;
        };
        Tooltip.prototype.toggleEnabled = function () {
            this.enabled = !this.enabled;
        };
        Tooltip.prototype.toggle = function (e) {
            var self = this;
            if (e) {
                self = $(e.currentTarget).data('bs.' + this.type);
                if (!self) {
                    self = new this.constructor(e.currentTarget, this.getDelegateOptions());
                    $(e.currentTarget).data('bs.' + this.type, self);
                }
            }
            if (e) {
                self.inState.click = !self.inState.click;
                if (self.isInStateTrue())
                    self.enter(self);
                else
                    self.leave(self);
            } else {
                self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
            }
        };
        Tooltip.prototype.destroy = function () {
            var that = this;
            clearTimeout(this.timeout);
            this.hide(function () {
                that.$element.off('.' + that.type).removeData('bs.' + that.type);
                if (that.$tip) {
                    that.$tip.detach();
                }
                that.$tip = null;
                that.$arrow = null;
                that.$viewport = null;
            });
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.tooltip');
                var options = typeof option == 'object' && option;
                if (!data && /destroy|hide/.test(option))
                    return;
                if (!data)
                    $this.data('bs.tooltip', data = new Tooltip(this, options));
                if (typeof option == 'string')
                    data[option]();
            });
        }
        var old = $.fn.tooltip;
        $.fn.tooltip = Plugin;
        $.fn.tooltip.Constructor = Tooltip;
        $.fn.tooltip.noConflict = function () {
            $.fn.tooltip = old;
            return this;
        };
    }(jQuery);
    return $.fn.tooltip;
});
define('popover', [
    'jquery',
    'tooltip'
], function () {
    +function ($) {
        'use strict';
        var Popover = function (element, options) {
            this.init('popover', element, options);
        };
        if (!$.fn.tooltip)
            throw new Error('Popover requires tooltip.js');
        Popover.VERSION = '3.3.6';
        Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
            placement: 'right',
            trigger: 'click',
            content: '',
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
        Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
        Popover.prototype.constructor = Popover;
        Popover.prototype.getDefaults = function () {
            return Popover.DEFAULTS;
        };
        Popover.prototype.setContent = function () {
            var $tip = this.tip();
            var title = this.getTitle();
            var content = this.getContent();
            $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
            $tip.find('.popover-content').children().detach().end()[this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);
            $tip.removeClass('fade top bottom left right in');
            if (!$tip.find('.popover-title').html())
                $tip.find('.popover-title').hide();
        };
        Popover.prototype.hasContent = function () {
            return this.getTitle() || this.getContent();
        };
        Popover.prototype.getContent = function () {
            var $e = this.$element;
            var o = this.options;
            return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
        };
        Popover.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find('.arrow');
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.popover');
                var options = typeof option == 'object' && option;
                if (!data && /destroy|hide/.test(option))
                    return;
                if (!data)
                    $this.data('bs.popover', data = new Popover(this, options));
                if (typeof option == 'string')
                    data[option]();
            });
        }
        var old = $.fn.popover;
        $.fn.popover = Plugin;
        $.fn.popover.Constructor = Popover;
        $.fn.popover.noConflict = function () {
            $.fn.popover = old;
            return this;
        };
    }(jQuery);
    return $.fn.popover;
});
define('scrollspy', ['jquery'], function () {
    +function ($) {
        'use strict';
        function ScrollSpy(element, options) {
            this.$body = $(document.body);
            this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
            this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
            this.selector = (this.options.target || '') + ' .nav li > a';
            this.offsets = [];
            this.targets = [];
            this.activeTarget = null;
            this.scrollHeight = 0;
            this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
            this.refresh();
            this.process();
        }
        ScrollSpy.VERSION = '3.3.6';
        ScrollSpy.DEFAULTS = { offset: 10 };
        ScrollSpy.prototype.getScrollHeight = function () {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
        };
        ScrollSpy.prototype.refresh = function () {
            var that = this;
            var offsetMethod = 'offset';
            var offsetBase = 0;
            this.offsets = [];
            this.targets = [];
            this.scrollHeight = this.getScrollHeight();
            if (!$.isWindow(this.$scrollElement[0])) {
                offsetMethod = 'position';
                offsetBase = this.$scrollElement.scrollTop();
            }
            this.$body.find(this.selector).map(function () {
                var $el = $(this);
                var href = $el.data('target') || $el.attr('href');
                var $href = /^#./.test(href) && $(href);
                return $href && $href.length && $href.is(':visible') && [[
                        $href[offsetMethod]().top + offsetBase,
                        href
                    ]] || null;
            }).sort(function (a, b) {
                return a[0] - b[0];
            }).each(function () {
                that.offsets.push(this[0]);
                that.targets.push(this[1]);
            });
        };
        ScrollSpy.prototype.process = function () {
            var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
            var scrollHeight = this.getScrollHeight();
            var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
            var offsets = this.offsets;
            var targets = this.targets;
            var activeTarget = this.activeTarget;
            var i;
            if (this.scrollHeight != scrollHeight) {
                this.refresh();
            }
            if (scrollTop >= maxScroll) {
                return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
            }
            if (activeTarget && scrollTop < offsets[0]) {
                this.activeTarget = null;
                return this.clear();
            }
            for (i = offsets.length; i--;) {
                activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
            }
        };
        ScrollSpy.prototype.activate = function (target) {
            this.activeTarget = target;
            this.clear();
            var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
            var active = $(selector).parents('li').addClass('active');
            if (active.parent('.dropdown-menu').length) {
                active = active.closest('li.dropdown').addClass('active');
            }
            active.trigger('activate.bs.scrollspy');
        };
        ScrollSpy.prototype.clear = function () {
            $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.scrollspy');
                var options = typeof option == 'object' && option;
                if (!data)
                    $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
                if (typeof option == 'string')
                    data[option]();
            });
        }
        var old = $.fn.scrollspy;
        $.fn.scrollspy = Plugin;
        $.fn.scrollspy.Constructor = ScrollSpy;
        $.fn.scrollspy.noConflict = function () {
            $.fn.scrollspy = old;
            return this;
        };
        $(window).on('load.bs.scrollspy.data-api', function () {
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this);
                Plugin.call($spy, $spy.data());
            });
        });
    }(jQuery);
    return $.fn.scrollspy;
});
define('tab', ['jquery'], function () {
    +function ($) {
        'use strict';
        var Tab = function (element) {
            this.element = $(element);
        };
        Tab.VERSION = '3.3.6';
        Tab.TRANSITION_DURATION = 150;
        Tab.prototype.show = function () {
            var $this = this.element;
            var $ul = $this.closest('ul:not(.dropdown-menu)');
            var selector = $this.data('target');
            if (!selector) {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
            }
            if ($this.parent('li').hasClass('active'))
                return;
            var $previous = $ul.find('.active:last a');
            var hideEvent = $.Event('hide.bs.tab', { relatedTarget: $this[0] });
            var showEvent = $.Event('show.bs.tab', { relatedTarget: $previous[0] });
            $previous.trigger(hideEvent);
            $this.trigger(showEvent);
            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented())
                return;
            var $target = $(selector);
            this.activate($this.closest('li'), $ul);
            this.activate($target, $target.parent(), function () {
                $previous.trigger({
                    type: 'hidden.bs.tab',
                    relatedTarget: $this[0]
                });
                $this.trigger({
                    type: 'shown.bs.tab',
                    relatedTarget: $previous[0]
                });
            });
        };
        Tab.prototype.activate = function (element, container, callback) {
            var $active = container.find('> .active');
            var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);
            function next() {
                $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
                element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);
                if (transition) {
                    element[0].offsetWidth;
                    element.addClass('in');
                } else {
                    element.removeClass('fade');
                }
                if (element.parent('.dropdown-menu').length) {
                    element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
                }
                callback && callback();
            }
            $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
            $active.removeClass('in');
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('bs.tab');
                if (!data)
                    $this.data('bs.tab', data = new Tab(this));
                if (typeof option == 'string')
                    data[option]();
            });
        }
        var old = $.fn.tab;
        $.fn.tab = Plugin;
        $.fn.tab.Constructor = Tab;
        $.fn.tab.noConflict = function () {
            $.fn.tab = old;
            return this;
        };
        var clickHandler = function (e) {
            e.preventDefault();
            Plugin.call($(this), 'show');
        };
        $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
    }(jQuery);
    return $.fn.tab;
});
define('transition', ['jquery'], function () {
    +function ($) {
        'use strict';
        function transitionEnd() {
            var el = document.createElement('bootstrap');
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return { end: transEndEventNames[name] };
                }
            }
            return false;
        }
        $.fn.emulateTransitionEnd = function (duration) {
            var called = false;
            var $el = this;
            $(this).one('bsTransitionEnd', function () {
                called = true;
            });
            var callback = function () {
                if (!called)
                    $($el).trigger($.support.transition.end);
            };
            setTimeout(callback, duration);
            return this;
        };
        $(function () {
            $.support.transition = transitionEnd();
            if (!$.support.transition)
                return;
            $.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function (e) {
                    if ($(e.target).is(this))
                        return e.handleObj.handler.apply(this, arguments);
                }
            };
        });
    }(jQuery);
    return $.fn.transition;
});
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('select2', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function (jQuery) {
    var S2 = function () {
        if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
            var S2 = jQuery.fn.select2.amd;
        }
        var S2;
        (function () {
            if (!S2 || !S2.requirejs) {
                if (!S2) {
                    S2 = {};
                } else {
                    require = S2;
                }
                var requirejs, require, define;
                (function (undef) {
                    var main, req, makeMap, handlers, defined = {}, waiting = {}, config = {}, defining = {}, hasOwn = Object.prototype.hasOwnProperty, aps = [].slice, jsSuffixRegExp = /\.js$/;
                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }
                    function normalize(name, baseName) {
                        var nameParts, nameSegment, mapValue, foundMap, lastIndex, foundI, foundStarMap, starI, i, j, part, baseParts = baseName && baseName.split('/'), map = config.map, starMap = map && map['*'] || {};
                        if (name && name.charAt(0) === '.') {
                            if (baseName) {
                                name = name.split('/');
                                lastIndex = name.length - 1;
                                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                                }
                                name = baseParts.slice(0, baseParts.length - 1).concat(name);
                                for (i = 0; i < name.length; i += 1) {
                                    part = name[i];
                                    if (part === '.') {
                                        name.splice(i, 1);
                                        i -= 1;
                                    } else if (part === '..') {
                                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                                            break;
                                        } else if (i > 0) {
                                            name.splice(i - 1, 2);
                                            i -= 2;
                                        }
                                    }
                                }
                                name = name.join('/');
                            } else if (name.indexOf('./') === 0) {
                                name = name.substring(2);
                            }
                        }
                        if ((baseParts || starMap) && map) {
                            nameParts = name.split('/');
                            for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join('/');
                                if (baseParts) {
                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = map[baseParts.slice(0, j).join('/')];
                                        if (mapValue) {
                                            mapValue = mapValue[nameSegment];
                                            if (mapValue) {
                                                foundMap = mapValue;
                                                foundI = i;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (foundMap) {
                                    break;
                                }
                                if (!foundStarMap && starMap && starMap[nameSegment]) {
                                    foundStarMap = starMap[nameSegment];
                                    starI = i;
                                }
                            }
                            if (!foundMap && foundStarMap) {
                                foundMap = foundStarMap;
                                foundI = starI;
                            }
                            if (foundMap) {
                                nameParts.splice(0, foundI, foundMap);
                                name = nameParts.join('/');
                            }
                        }
                        return name;
                    }
                    function makeRequire(relName, forceSync) {
                        return function () {
                            var args = aps.call(arguments, 0);
                            if (typeof args[0] !== 'string' && args.length === 1) {
                                args.push(null);
                            }
                            return req.apply(undef, args.concat([
                                relName,
                                forceSync
                            ]));
                        };
                    }
                    function makeNormalize(relName) {
                        return function (name) {
                            return normalize(name, relName);
                        };
                    }
                    function makeLoad(depName) {
                        return function (value) {
                            defined[depName] = value;
                        };
                    }
                    function callDep(name) {
                        if (hasProp(waiting, name)) {
                            var args = waiting[name];
                            delete waiting[name];
                            defining[name] = true;
                            main.apply(undef, args);
                        }
                        if (!hasProp(defined, name) && !hasProp(defining, name)) {
                            throw new Error('No ' + name);
                        }
                        return defined[name];
                    }
                    function splitPrefix(name) {
                        var prefix, index = name ? name.indexOf('!') : -1;
                        if (index > -1) {
                            prefix = name.substring(0, index);
                            name = name.substring(index + 1, name.length);
                        }
                        return [
                            prefix,
                            name
                        ];
                    }
                    makeMap = function (name, relName) {
                        var plugin, parts = splitPrefix(name), prefix = parts[0];
                        name = parts[1];
                        if (prefix) {
                            prefix = normalize(prefix, relName);
                            plugin = callDep(prefix);
                        }
                        if (prefix) {
                            if (plugin && plugin.normalize) {
                                name = plugin.normalize(name, makeNormalize(relName));
                            } else {
                                name = normalize(name, relName);
                            }
                        } else {
                            name = normalize(name, relName);
                            parts = splitPrefix(name);
                            prefix = parts[0];
                            name = parts[1];
                            if (prefix) {
                                plugin = callDep(prefix);
                            }
                        }
                        return {
                            f: prefix ? prefix + '!' + name : name,
                            n: name,
                            pr: prefix,
                            p: plugin
                        };
                    };
                    function makeConfig(name) {
                        return function () {
                            return config && config.config && config.config[name] || {};
                        };
                    }
                    handlers = {
                        require: function (name) {
                            return makeRequire(name);
                        },
                        exports: function (name) {
                            var e = defined[name];
                            if (typeof e !== 'undefined') {
                                return e;
                            } else {
                                return defined[name] = {};
                            }
                        },
                        module: function (name) {
                            return {
                                id: name,
                                uri: '',
                                exports: defined[name],
                                config: makeConfig(name)
                            };
                        }
                    };
                    main = function (name, deps, callback, relName) {
                        var cjsModule, depName, ret, map, i, args = [], callbackType = typeof callback, usingExports;
                        relName = relName || name;
                        if (callbackType === 'undefined' || callbackType === 'function') {
                            deps = !deps.length && callback.length ? [
                                'require',
                                'exports',
                                'module'
                            ] : deps;
                            for (i = 0; i < deps.length; i += 1) {
                                map = makeMap(deps[i], relName);
                                depName = map.f;
                                if (depName === 'require') {
                                    args[i] = handlers.require(name);
                                } else if (depName === 'exports') {
                                    args[i] = handlers.exports(name);
                                    usingExports = true;
                                } else if (depName === 'module') {
                                    cjsModule = args[i] = handlers.module(name);
                                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                                    args[i] = callDep(depName);
                                } else if (map.p) {
                                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                                    args[i] = defined[depName];
                                } else {
                                    throw new Error(name + ' missing ' + depName);
                                }
                            }
                            ret = callback ? callback.apply(defined[name], args) : undefined;
                            if (name) {
                                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                                    defined[name] = cjsModule.exports;
                                } else if (ret !== undef || !usingExports) {
                                    defined[name] = ret;
                                }
                            }
                        } else if (name) {
                            defined[name] = callback;
                        }
                    };
                    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
                        if (typeof deps === 'string') {
                            if (handlers[deps]) {
                                return handlers[deps](callback);
                            }
                            return callDep(makeMap(deps, callback).f);
                        } else if (!deps.splice) {
                            config = deps;
                            if (config.deps) {
                                req(config.deps, config.callback);
                            }
                            if (!callback) {
                                return;
                            }
                            if (callback.splice) {
                                deps = callback;
                                callback = relName;
                                relName = null;
                            } else {
                                deps = undef;
                            }
                        }
                        callback = callback || function () {
                        };
                        if (typeof relName === 'function') {
                            relName = forceSync;
                            forceSync = alt;
                        }
                        if (forceSync) {
                            main(undef, deps, callback, relName);
                        } else {
                            setTimeout(function () {
                                main(undef, deps, callback, relName);
                            }, 4);
                        }
                        return req;
                    };
                    req.config = function (cfg) {
                        return req(cfg);
                    };
                    requirejs._defined = defined;
                    define = function (name, deps, callback) {
                        if (typeof name !== 'string') {
                            throw new Error('See almond README: incorrect module build, no module name');
                        }
                        if (!deps.splice) {
                            callback = deps;
                            deps = [];
                        }
                        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                            waiting[name] = [
                                name,
                                deps,
                                callback
                            ];
                        }
                    };
                    define.amd = { jQuery: true };
                }());
                S2.requirejs = requirejs;
                S2.require = require;
                S2.define = define;
            }
        }());
        S2.define('almond', function () {
        });
        S2.define('jquery', [], function () {
            var _$ = jQuery || $;
            if (_$ == null && console && console.error) {
                console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
            }
            return _$;
        });
        S2.define('select2/utils', ['jquery'], function ($) {
            var Utils = {};
            Utils.Extend = function (ChildClass, SuperClass) {
                var __hasProp = {}.hasOwnProperty;
                function BaseConstructor() {
                    this.constructor = ChildClass;
                }
                for (var key in SuperClass) {
                    if (__hasProp.call(SuperClass, key)) {
                        ChildClass[key] = SuperClass[key];
                    }
                }
                BaseConstructor.prototype = SuperClass.prototype;
                ChildClass.prototype = new BaseConstructor();
                ChildClass.__super__ = SuperClass.prototype;
                return ChildClass;
            };
            function getMethods(theClass) {
                var proto = theClass.prototype;
                var methods = [];
                for (var methodName in proto) {
                    var m = proto[methodName];
                    if (typeof m !== 'function') {
                        continue;
                    }
                    if (methodName === 'constructor') {
                        continue;
                    }
                    methods.push(methodName);
                }
                return methods;
            }
            Utils.Decorate = function (SuperClass, DecoratorClass) {
                var decoratedMethods = getMethods(DecoratorClass);
                var superMethods = getMethods(SuperClass);
                function DecoratedClass() {
                    var unshift = Array.prototype.unshift;
                    var argCount = DecoratorClass.prototype.constructor.length;
                    var calledConstructor = SuperClass.prototype.constructor;
                    if (argCount > 0) {
                        unshift.call(arguments, SuperClass.prototype.constructor);
                        calledConstructor = DecoratorClass.prototype.constructor;
                    }
                    calledConstructor.apply(this, arguments);
                }
                DecoratorClass.displayName = SuperClass.displayName;
                function ctr() {
                    this.constructor = DecoratedClass;
                }
                DecoratedClass.prototype = new ctr();
                for (var m = 0; m < superMethods.length; m++) {
                    var superMethod = superMethods[m];
                    DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
                }
                var calledMethod = function (methodName) {
                    var originalMethod = function () {
                    };
                    if (methodName in DecoratedClass.prototype) {
                        originalMethod = DecoratedClass.prototype[methodName];
                    }
                    var decoratedMethod = DecoratorClass.prototype[methodName];
                    return function () {
                        var unshift = Array.prototype.unshift;
                        unshift.call(arguments, originalMethod);
                        return decoratedMethod.apply(this, arguments);
                    };
                };
                for (var d = 0; d < decoratedMethods.length; d++) {
                    var decoratedMethod = decoratedMethods[d];
                    DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
                }
                return DecoratedClass;
            };
            var Observable = function () {
                this.listeners = {};
            };
            Observable.prototype.on = function (event, callback) {
                this.listeners = this.listeners || {};
                if (event in this.listeners) {
                    this.listeners[event].push(callback);
                } else {
                    this.listeners[event] = [callback];
                }
            };
            Observable.prototype.trigger = function (event) {
                var slice = Array.prototype.slice;
                this.listeners = this.listeners || {};
                if (event in this.listeners) {
                    this.invoke(this.listeners[event], slice.call(arguments, 1));
                }
                if ('*' in this.listeners) {
                    this.invoke(this.listeners['*'], arguments);
                }
            };
            Observable.prototype.invoke = function (listeners, params) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].apply(this, params);
                }
            };
            Utils.Observable = Observable;
            Utils.generateChars = function (length) {
                var chars = '';
                for (var i = 0; i < length; i++) {
                    var randomChar = Math.floor(Math.random() * 36);
                    chars += randomChar.toString(36);
                }
                return chars;
            };
            Utils.bind = function (func, context) {
                return function () {
                    func.apply(context, arguments);
                };
            };
            Utils._convertData = function (data) {
                for (var originalKey in data) {
                    var keys = originalKey.split('-');
                    var dataLevel = data;
                    if (keys.length === 1) {
                        continue;
                    }
                    for (var k = 0; k < keys.length; k++) {
                        var key = keys[k];
                        key = key.substring(0, 1).toLowerCase() + key.substring(1);
                        if (!(key in dataLevel)) {
                            dataLevel[key] = {};
                        }
                        if (k == keys.length - 1) {
                            dataLevel[key] = data[originalKey];
                        }
                        dataLevel = dataLevel[key];
                    }
                    delete data[originalKey];
                }
                return data;
            };
            Utils.hasScroll = function (index, el) {
                var $el = $(el);
                var overflowX = el.style.overflowX;
                var overflowY = el.style.overflowY;
                if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
                    return false;
                }
                if (overflowX === 'scroll' || overflowY === 'scroll') {
                    return true;
                }
                return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
            };
            Utils.escapeMarkup = function (markup) {
                var replaceMap = {
                    '\\': '&#92;',
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    '\'': '&#39;',
                    '/': '&#47;'
                };
                if (typeof markup !== 'string') {
                    return markup;
                }
                return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
                    return replaceMap[match];
                });
            };
            Utils.appendMany = function ($element, $nodes) {
                if ($.fn.jquery.substr(0, 3) === '1.7') {
                    var $jqNodes = $();
                    $.map($nodes, function (node) {
                        $jqNodes = $jqNodes.add(node);
                    });
                    $nodes = $jqNodes;
                }
                $element.append($nodes);
            };
            return Utils;
        });
        S2.define('select2/results', [
            'jquery',
            './utils'
        ], function ($, Utils) {
            function Results($element, options, dataAdapter) {
                this.$element = $element;
                this.data = dataAdapter;
                this.options = options;
                Results.__super__.constructor.call(this);
            }
            Utils.Extend(Results, Utils.Observable);
            Results.prototype.render = function () {
                var $results = $('<ul class="select2-results__options" role="tree"></ul>');
                if (this.options.get('multiple')) {
                    $results.attr('aria-multiselectable', 'true');
                }
                this.$results = $results;
                return $results;
            };
            Results.prototype.clear = function () {
                this.$results.empty();
            };
            Results.prototype.displayMessage = function (params) {
                var escapeMarkup = this.options.get('escapeMarkup');
                this.clear();
                this.hideLoading();
                var $message = $('<li role="treeitem" aria-live="assertive"' + ' class="select2-results__option"></li>');
                var message = this.options.get('translations').get(params.message);
                $message.append(escapeMarkup(message(params.args)));
                $message[0].className += ' select2-results__message';
                this.$results.append($message);
            };
            Results.prototype.hideMessages = function () {
                this.$results.find('.select2-results__message').remove();
            };
            Results.prototype.append = function (data) {
                this.hideLoading();
                var $options = [];
                if (data.results == null || data.results.length === 0) {
                    if (this.$results.children().length === 0) {
                        this.trigger('results:message', { message: 'noResults' });
                    }
                    return;
                }
                data.results = this.sort(data.results);
                for (var d = 0; d < data.results.length; d++) {
                    var item = data.results[d];
                    var $option = this.option(item);
                    $options.push($option);
                }
                this.$results.append($options);
            };
            Results.prototype.position = function ($results, $dropdown) {
                var $resultsContainer = $dropdown.find('.select2-results');
                $resultsContainer.append($results);
            };
            Results.prototype.sort = function (data) {
                var sorter = this.options.get('sorter');
                return sorter(data);
            };
            Results.prototype.setClasses = function () {
                var self = this;
                this.data.current(function (selected) {
                    var selectedIds = $.map(selected, function (s) {
                        return s.id.toString();
                    });
                    var $options = self.$results.find('.select2-results__option[aria-selected]');
                    $options.each(function () {
                        var $option = $(this);
                        var item = $.data(this, 'data');
                        var id = '' + item.id;
                        if (item.element != null && item.element.selected || item.element == null && $.inArray(id, selectedIds) > -1) {
                            $option.attr('aria-selected', 'true');
                        } else {
                            $option.attr('aria-selected', 'false');
                        }
                    });
                    var $selected = $options.filter('[aria-selected=true]');
                    if ($selected.length > 0) {
                        $selected.first().trigger('mouseenter');
                    } else {
                        $options.first().trigger('mouseenter');
                    }
                });
            };
            Results.prototype.showLoading = function (params) {
                this.hideLoading();
                var loadingMore = this.options.get('translations').get('searching');
                var loading = {
                    disabled: true,
                    loading: true,
                    text: loadingMore(params)
                };
                var $loading = this.option(loading);
                $loading.className += ' loading-results';
                this.$results.prepend($loading);
            };
            Results.prototype.hideLoading = function () {
                this.$results.find('.loading-results').remove();
            };
            Results.prototype.option = function (data) {
                var option = document.createElement('li');
                option.className = 'select2-results__option';
                var attrs = {
                    'role': 'treeitem',
                    'aria-selected': 'false'
                };
                if (data.disabled) {
                    delete attrs['aria-selected'];
                    attrs['aria-disabled'] = 'true';
                }
                if (data.id == null) {
                    delete attrs['aria-selected'];
                }
                if (data._resultId != null) {
                    option.id = data._resultId;
                }
                if (data.title) {
                    option.title = data.title;
                }
                if (data.children) {
                    attrs.role = 'group';
                    attrs['aria-label'] = data.text;
                    delete attrs['aria-selected'];
                }
                for (var attr in attrs) {
                    var val = attrs[attr];
                    option.setAttribute(attr, val);
                }
                if (data.children) {
                    var $option = $(option);
                    var label = document.createElement('strong');
                    label.className = 'select2-results__group';
                    var $label = $(label);
                    this.template(data, label);
                    var $children = [];
                    for (var c = 0; c < data.children.length; c++) {
                        var child = data.children[c];
                        var $child = this.option(child);
                        $children.push($child);
                    }
                    var $childrenContainer = $('<ul></ul>', { 'class': 'select2-results__options select2-results__options--nested' });
                    $childrenContainer.append($children);
                    $option.append(label);
                    $option.append($childrenContainer);
                } else {
                    this.template(data, option);
                }
                $.data(option, 'data', data);
                return option;
            };
            Results.prototype.bind = function (container, $container) {
                var self = this;
                var id = container.id + '-results';
                this.$results.attr('id', id);
                container.on('results:all', function (params) {
                    self.clear();
                    self.append(params.data);
                    if (container.isOpen()) {
                        self.setClasses();
                    }
                });
                container.on('results:append', function (params) {
                    self.append(params.data);
                    if (container.isOpen()) {
                        self.setClasses();
                    }
                });
                container.on('query', function (params) {
                    self.hideMessages();
                    self.showLoading(params);
                });
                container.on('select', function () {
                    if (!container.isOpen()) {
                        return;
                    }
                    self.setClasses();
                });
                container.on('unselect', function () {
                    if (!container.isOpen()) {
                        return;
                    }
                    self.setClasses();
                });
                container.on('open', function () {
                    self.$results.attr('aria-expanded', 'true');
                    self.$results.attr('aria-hidden', 'false');
                    self.setClasses();
                    self.ensureHighlightVisible();
                });
                container.on('close', function () {
                    self.$results.attr('aria-expanded', 'false');
                    self.$results.attr('aria-hidden', 'true');
                    self.$results.removeAttr('aria-activedescendant');
                });
                container.on('results:toggle', function () {
                    var $highlighted = self.getHighlightedResults();
                    if ($highlighted.length === 0) {
                        return;
                    }
                    $highlighted.trigger('mouseup');
                });
                container.on('results:select', function () {
                    var $highlighted = self.getHighlightedResults();
                    if ($highlighted.length === 0) {
                        return;
                    }
                    var data = $highlighted.data('data');
                    if ($highlighted.attr('aria-selected') == 'true') {
                        self.trigger('close', {});
                    } else {
                        self.trigger('select', { data: data });
                    }
                });
                container.on('results:previous', function () {
                    var $highlighted = self.getHighlightedResults();
                    var $options = self.$results.find('[aria-selected]');
                    var currentIndex = $options.index($highlighted);
                    if (currentIndex === 0) {
                        return;
                    }
                    var nextIndex = currentIndex - 1;
                    if ($highlighted.length === 0) {
                        nextIndex = 0;
                    }
                    var $next = $options.eq(nextIndex);
                    $next.trigger('mouseenter');
                    var currentOffset = self.$results.offset().top;
                    var nextTop = $next.offset().top;
                    var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);
                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextTop - currentOffset < 0) {
                        self.$results.scrollTop(nextOffset);
                    }
                });
                container.on('results:next', function () {
                    var $highlighted = self.getHighlightedResults();
                    var $options = self.$results.find('[aria-selected]');
                    var currentIndex = $options.index($highlighted);
                    var nextIndex = currentIndex + 1;
                    if (nextIndex >= $options.length) {
                        return;
                    }
                    var $next = $options.eq(nextIndex);
                    $next.trigger('mouseenter');
                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
                    var nextBottom = $next.offset().top + $next.outerHeight(false);
                    var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;
                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextBottom > currentOffset) {
                        self.$results.scrollTop(nextOffset);
                    }
                });
                container.on('results:focus', function (params) {
                    params.element.addClass('select2-results__option--highlighted');
                });
                container.on('results:message', function (params) {
                    self.displayMessage(params);
                });
                if ($.fn.mousewheel) {
                    this.$results.on('mousewheel', function (e) {
                        var top = self.$results.scrollTop();
                        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;
                        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
                        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();
                        if (isAtTop) {
                            self.$results.scrollTop(0);
                            e.preventDefault();
                            e.stopPropagation();
                        } else if (isAtBottom) {
                            self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }
                this.$results.on('mouseup', '.select2-results__option[aria-selected]', function (evt) {
                    var $this = $(this);
                    var data = $this.data('data');
                    if ($this.attr('aria-selected') === 'true') {
                        if (self.options.get('multiple')) {
                            self.trigger('unselect', {
                                originalEvent: evt,
                                data: data
                            });
                        } else {
                            self.trigger('close', {});
                        }
                        return;
                    }
                    self.trigger('select', {
                        originalEvent: evt,
                        data: data
                    });
                });
                this.$results.on('mouseenter', '.select2-results__option[aria-selected]', function (evt) {
                    var data = $(this).data('data');
                    self.getHighlightedResults().removeClass('select2-results__option--highlighted');
                    self.trigger('results:focus', {
                        data: data,
                        element: $(this)
                    });
                });
            };
            Results.prototype.getHighlightedResults = function () {
                var $highlighted = this.$results.find('.select2-results__option--highlighted');
                return $highlighted;
            };
            Results.prototype.destroy = function () {
                this.$results.remove();
            };
            Results.prototype.ensureHighlightVisible = function () {
                var $highlighted = this.getHighlightedResults();
                if ($highlighted.length === 0) {
                    return;
                }
                var $options = this.$results.find('[aria-selected]');
                var currentIndex = $options.index($highlighted);
                var currentOffset = this.$results.offset().top;
                var nextTop = $highlighted.offset().top;
                var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);
                var offsetDelta = nextTop - currentOffset;
                nextOffset -= $highlighted.outerHeight(false) * 2;
                if (currentIndex <= 2) {
                    this.$results.scrollTop(0);
                } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
                    this.$results.scrollTop(nextOffset);
                }
            };
            Results.prototype.template = function (result, container) {
                var template = this.options.get('templateResult');
                var escapeMarkup = this.options.get('escapeMarkup');
                var content = template(result, container);
                if (content == null) {
                    container.style.display = 'none';
                } else if (typeof content === 'string') {
                    container.innerHTML = escapeMarkup(content);
                } else {
                    $(container).append(content);
                }
            };
            return Results;
        });
        S2.define('select2/keys', [], function () {
            var KEYS = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };
            return KEYS;
        });
        S2.define('select2/selection/base', [
            'jquery',
            '../utils',
            '../keys'
        ], function ($, Utils, KEYS) {
            function BaseSelection($element, options) {
                this.$element = $element;
                this.options = options;
                BaseSelection.__super__.constructor.call(this);
            }
            Utils.Extend(BaseSelection, Utils.Observable);
            BaseSelection.prototype.render = function () {
                var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');
                this._tabindex = 0;
                if (this.$element.data('old-tabindex') != null) {
                    this._tabindex = this.$element.data('old-tabindex');
                } else if (this.$element.attr('tabindex') != null) {
                    this._tabindex = this.$element.attr('tabindex');
                }
                $selection.attr('title', this.$element.attr('title'));
                $selection.attr('tabindex', this._tabindex);
                this.$selection = $selection;
                return $selection;
            };
            BaseSelection.prototype.bind = function (container, $container) {
                var self = this;
                var id = container.id + '-container';
                var resultsId = container.id + '-results';
                this.container = container;
                this.$selection.on('focus', function (evt) {
                    self.trigger('focus', evt);
                });
                this.$selection.on('blur', function (evt) {
                    self._handleBlur(evt);
                });
                this.$selection.on('keydown', function (evt) {
                    self.trigger('keypress', evt);
                    if (evt.which === KEYS.SPACE) {
                        evt.preventDefault();
                    }
                });
                container.on('results:focus', function (params) {
                    self.$selection.attr('aria-activedescendant', params.data._resultId);
                });
                container.on('selection:update', function (params) {
                    self.update(params.data);
                });
                container.on('open', function () {
                    self.$selection.attr('aria-expanded', 'true');
                    self.$selection.attr('aria-owns', resultsId);
                    self._attachCloseHandler(container);
                });
                container.on('close', function () {
                    self.$selection.attr('aria-expanded', 'false');
                    self.$selection.removeAttr('aria-activedescendant');
                    self.$selection.removeAttr('aria-owns');
                    self.$selection.focus();
                    self._detachCloseHandler(container);
                });
                container.on('enable', function () {
                    self.$selection.attr('tabindex', self._tabindex);
                });
                container.on('disable', function () {
                    self.$selection.attr('tabindex', '-1');
                });
            };
            BaseSelection.prototype._handleBlur = function (evt) {
                var self = this;
                window.setTimeout(function () {
                    if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
                        return;
                    }
                    self.trigger('blur', evt);
                }, 1);
            };
            BaseSelection.prototype._attachCloseHandler = function (container) {
                var self = this;
                $(document.body).on('mousedown.select2.' + container.id, function (e) {
                    var $target = $(e.target);
                    var $select = $target.closest('.select2');
                    var $all = $('.select2.select2-container--open');
                    $all.each(function () {
                        var $this = $(this);
                        if (this == $select[0]) {
                            return;
                        }
                        var $element = $this.data('element');
                        $element.select2('close');
                    });
                });
            };
            BaseSelection.prototype._detachCloseHandler = function (container) {
                $(document.body).off('mousedown.select2.' + container.id);
            };
            BaseSelection.prototype.position = function ($selection, $container) {
                var $selectionContainer = $container.find('.selection');
                $selectionContainer.append($selection);
            };
            BaseSelection.prototype.destroy = function () {
                this._detachCloseHandler(this.container);
            };
            BaseSelection.prototype.update = function (data) {
                throw new Error('The `update` method must be defined in child classes.');
            };
            return BaseSelection;
        });
        S2.define('select2/selection/single', [
            'jquery',
            './base',
            '../utils',
            '../keys'
        ], function ($, BaseSelection, Utils, KEYS) {
            function SingleSelection() {
                SingleSelection.__super__.constructor.apply(this, arguments);
            }
            Utils.Extend(SingleSelection, BaseSelection);
            SingleSelection.prototype.render = function () {
                var $selection = SingleSelection.__super__.render.call(this);
                $selection.addClass('select2-selection--single');
                $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');
                return $selection;
            };
            SingleSelection.prototype.bind = function (container, $container) {
                var self = this;
                SingleSelection.__super__.bind.apply(this, arguments);
                var id = container.id + '-container';
                this.$selection.find('.select2-selection__rendered').attr('id', id);
                this.$selection.attr('aria-labelledby', id);
                this.$selection.on('mousedown', function (evt) {
                    if (evt.which !== 1) {
                        return;
                    }
                    self.trigger('toggle', { originalEvent: evt });
                });
                this.$selection.on('focus', function (evt) {
                });
                this.$selection.on('blur', function (evt) {
                });
                container.on('selection:update', function (params) {
                    self.update(params.data);
                });
            };
            SingleSelection.prototype.clear = function () {
                this.$selection.find('.select2-selection__rendered').empty();
            };
            SingleSelection.prototype.display = function (data, container) {
                var template = this.options.get('templateSelection');
                var escapeMarkup = this.options.get('escapeMarkup');
                return escapeMarkup(template(data, container));
            };
            SingleSelection.prototype.selectionContainer = function () {
                return $('<span></span>');
            };
            SingleSelection.prototype.update = function (data) {
                if (data.length === 0) {
                    this.clear();
                    return;
                }
                var selection = data[0];
                var $rendered = this.$selection.find('.select2-selection__rendered');
                var formatted = this.display(selection, $rendered);
                $rendered.empty().append(formatted);
                $rendered.prop('title', selection.title || selection.text);
            };
            return SingleSelection;
        });
        S2.define('select2/selection/multiple', [
            'jquery',
            './base',
            '../utils'
        ], function ($, BaseSelection, Utils) {
            function MultipleSelection($element, options) {
                MultipleSelection.__super__.constructor.apply(this, arguments);
            }
            Utils.Extend(MultipleSelection, BaseSelection);
            MultipleSelection.prototype.render = function () {
                var $selection = MultipleSelection.__super__.render.call(this);
                $selection.addClass('select2-selection--multiple');
                $selection.html('<ul class="select2-selection__rendered"></ul>');
                return $selection;
            };
            MultipleSelection.prototype.bind = function (container, $container) {
                var self = this;
                MultipleSelection.__super__.bind.apply(this, arguments);
                this.$selection.on('click', function (evt) {
                    self.trigger('toggle', { originalEvent: evt });
                });
                this.$selection.on('click', '.select2-selection__choice__remove', function (evt) {
                    if (self.options.get('disabled')) {
                        return;
                    }
                    var $remove = $(this);
                    var $selection = $remove.parent();
                    var data = $selection.data('data');
                    self.trigger('unselect', {
                        originalEvent: evt,
                        data: data
                    });
                });
            };
            MultipleSelection.prototype.clear = function () {
                this.$selection.find('.select2-selection__rendered').empty();
            };
            MultipleSelection.prototype.display = function (data, container) {
                var template = this.options.get('templateSelection');
                var escapeMarkup = this.options.get('escapeMarkup');
                return escapeMarkup(template(data, container));
            };
            MultipleSelection.prototype.selectionContainer = function () {
                var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + '&times;' + '</span>' + '</li>');
                return $container;
            };
            MultipleSelection.prototype.update = function (data) {
                this.clear();
                if (data.length === 0) {
                    return;
                }
                var $selections = [];
                for (var d = 0; d < data.length; d++) {
                    var selection = data[d];
                    var $selection = this.selectionContainer();
                    var formatted = this.display(selection, $selection);
                    $selection.append(formatted);
                    $selection.prop('title', selection.title || selection.text);
                    $selection.data('data', selection);
                    $selections.push($selection);
                }
                var $rendered = this.$selection.find('.select2-selection__rendered');
                Utils.appendMany($rendered, $selections);
            };
            return MultipleSelection;
        });
        S2.define('select2/selection/placeholder', ['../utils'], function (Utils) {
            function Placeholder(decorated, $element, options) {
                this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
                decorated.call(this, $element, options);
            }
            Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
                if (typeof placeholder === 'string') {
                    placeholder = {
                        id: '',
                        text: placeholder
                    };
                }
                return placeholder;
            };
            Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
                var $placeholder = this.selectionContainer();
                $placeholder.html(this.display(placeholder));
                $placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');
                return $placeholder;
            };
            Placeholder.prototype.update = function (decorated, data) {
                var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
                var multipleSelections = data.length > 1;
                if (multipleSelections || singlePlaceholder) {
                    return decorated.call(this, data);
                }
                this.clear();
                var $placeholder = this.createPlaceholder(this.placeholder);
                this.$selection.find('.select2-selection__rendered').append($placeholder);
            };
            return Placeholder;
        });
        S2.define('select2/selection/allowClear', [
            'jquery',
            '../keys'
        ], function ($, KEYS) {
            function AllowClear() {
            }
            AllowClear.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                if (this.placeholder == null) {
                    if (this.options.get('debug') && window.console && console.error) {
                        console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
                    }
                }
                this.$selection.on('mousedown', '.select2-selection__clear', function (evt) {
                    self._handleClear(evt);
                });
                container.on('keypress', function (evt) {
                    self._handleKeyboardClear(evt, container);
                });
            };
            AllowClear.prototype._handleClear = function (_, evt) {
                if (this.options.get('disabled')) {
                    return;
                }
                var $clear = this.$selection.find('.select2-selection__clear');
                if ($clear.length === 0) {
                    return;
                }
                evt.stopPropagation();
                var data = $clear.data('data');
                for (var d = 0; d < data.length; d++) {
                    var unselectData = { data: data[d] };
                    this.trigger('unselect', unselectData);
                    if (unselectData.prevented) {
                        return;
                    }
                }
                this.$element.val(this.placeholder.id).trigger('change');
                this.trigger('toggle', {});
            };
            AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
                if (container.isOpen()) {
                    return;
                }
                if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
                    this._handleClear(evt);
                }
            };
            AllowClear.prototype.update = function (decorated, data) {
                decorated.call(this, data);
                if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
                    return;
                }
                var $remove = $('<span class="select2-selection__clear">' + '&times;' + '</span>');
                $remove.data('data', data);
                this.$selection.find('.select2-selection__rendered').prepend($remove);
            };
            return AllowClear;
        });
        S2.define('select2/selection/search', [
            'jquery',
            '../utils',
            '../keys'
        ], function ($, Utils, KEYS) {
            function Search(decorated, $element, options) {
                decorated.call(this, $element, options);
            }
            Search.prototype.render = function (decorated) {
                var $search = $('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" aria-autocomplete="list" />' + '</li>');
                this.$searchContainer = $search;
                this.$search = $search.find('input');
                var $rendered = decorated.call(this);
                this._transferTabIndex();
                return $rendered;
            };
            Search.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on('open', function () {
                    self.$search.trigger('focus');
                });
                container.on('close', function () {
                    self.$search.val('');
                    self.$search.removeAttr('aria-activedescendant');
                    self.$search.trigger('focus');
                });
                container.on('enable', function () {
                    self.$search.prop('disabled', false);
                    self._transferTabIndex();
                });
                container.on('disable', function () {
                    self.$search.prop('disabled', true);
                });
                container.on('focus', function (evt) {
                    self.$search.trigger('focus');
                });
                container.on('results:focus', function (params) {
                    self.$search.attr('aria-activedescendant', params.id);
                });
                this.$selection.on('focusin', '.select2-search--inline', function (evt) {
                    self.trigger('focus', evt);
                });
                this.$selection.on('focusout', '.select2-search--inline', function (evt) {
                    self._handleBlur(evt);
                });
                this.$selection.on('keydown', '.select2-search--inline', function (evt) {
                    evt.stopPropagation();
                    self.trigger('keypress', evt);
                    self._keyUpPrevented = evt.isDefaultPrevented();
                    var key = evt.which;
                    if (key === KEYS.BACKSPACE && self.$search.val() === '') {
                        var $previousChoice = self.$searchContainer.prev('.select2-selection__choice');
                        if ($previousChoice.length > 0) {
                            var item = $previousChoice.data('data');
                            self.searchRemoveChoice(item);
                            evt.preventDefault();
                        }
                    }
                });
                var msie = document.documentMode;
                var disableInputEvents = msie && msie <= 11;
                this.$selection.on('input.searchcheck', '.select2-search--inline', function (evt) {
                    if (disableInputEvents) {
                        self.$selection.off('input.search input.searchcheck');
                        return;
                    }
                    self.$selection.off('keyup.search');
                });
                this.$selection.on('keyup.search input.search', '.select2-search--inline', function (evt) {
                    if (disableInputEvents && evt.type === 'input') {
                        self.$selection.off('input.search input.searchcheck');
                        return;
                    }
                    var key = evt.which;
                    if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                        return;
                    }
                    if (key == KEYS.TAB) {
                        return;
                    }
                    self.handleSearch(evt);
                });
            };
            Search.prototype._transferTabIndex = function (decorated) {
                this.$search.attr('tabindex', this.$selection.attr('tabindex'));
                this.$selection.attr('tabindex', '-1');
            };
            Search.prototype.createPlaceholder = function (decorated, placeholder) {
                this.$search.attr('placeholder', placeholder.text);
            };
            Search.prototype.update = function (decorated, data) {
                var searchHadFocus = this.$search[0] == document.activeElement;
                this.$search.attr('placeholder', '');
                decorated.call(this, data);
                this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);
                this.resizeSearch();
                if (searchHadFocus) {
                    this.$search.focus();
                }
            };
            Search.prototype.handleSearch = function () {
                this.resizeSearch();
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();
                    this.trigger('query', { term: input });
                }
                this._keyUpPrevented = false;
            };
            Search.prototype.searchRemoveChoice = function (decorated, item) {
                this.trigger('unselect', { data: item });
                this.$search.val(item.text);
                this.handleSearch();
            };
            Search.prototype.resizeSearch = function () {
                this.$search.css('width', '25px');
                var width = '';
                if (this.$search.attr('placeholder') !== '') {
                    width = this.$selection.find('.select2-selection__rendered').innerWidth();
                } else {
                    var minimumWidth = this.$search.val().length + 1;
                    width = minimumWidth * 0.75 + 'em';
                }
                this.$search.css('width', width);
            };
            return Search;
        });
        S2.define('select2/selection/eventRelay', ['jquery'], function ($) {
            function EventRelay() {
            }
            EventRelay.prototype.bind = function (decorated, container, $container) {
                var self = this;
                var relayEvents = [
                    'open',
                    'opening',
                    'close',
                    'closing',
                    'select',
                    'selecting',
                    'unselect',
                    'unselecting'
                ];
                var preventableEvents = [
                    'opening',
                    'closing',
                    'selecting',
                    'unselecting'
                ];
                decorated.call(this, container, $container);
                container.on('*', function (name, params) {
                    if ($.inArray(name, relayEvents) === -1) {
                        return;
                    }
                    params = params || {};
                    var evt = $.Event('select2:' + name, { params: params });
                    self.$element.trigger(evt);
                    if ($.inArray(name, preventableEvents) === -1) {
                        return;
                    }
                    params.prevented = evt.isDefaultPrevented();
                });
            };
            return EventRelay;
        });
        S2.define('select2/translation', [
            'jquery',
            'require'
        ], function ($, require) {
            function Translation(dict) {
                this.dict = dict || {};
            }
            Translation.prototype.all = function () {
                return this.dict;
            };
            Translation.prototype.get = function (key) {
                return this.dict[key];
            };
            Translation.prototype.extend = function (translation) {
                this.dict = $.extend({}, translation.all(), this.dict);
            };
            Translation._cache = {};
            Translation.loadPath = function (path) {
                if (!(path in Translation._cache)) {
                    var translations = require(path);
                    Translation._cache[path] = translations;
                }
                return new Translation(Translation._cache[path]);
            };
            return Translation;
        });
        S2.define('select2/diacritics', [], function () {
            var diacritics = {
                '\u24B6': 'A',
                'Ａ': 'A',
                'À': 'A',
                'Á': 'A',
                'Â': 'A',
                'Ầ': 'A',
                'Ấ': 'A',
                'Ẫ': 'A',
                'Ẩ': 'A',
                'Ã': 'A',
                'Ā': 'A',
                'Ă': 'A',
                'Ằ': 'A',
                'Ắ': 'A',
                'Ẵ': 'A',
                'Ẳ': 'A',
                'Ȧ': 'A',
                'Ǡ': 'A',
                'Ä': 'A',
                'Ǟ': 'A',
                'Ả': 'A',
                'Å': 'A',
                'Ǻ': 'A',
                'Ǎ': 'A',
                'Ȁ': 'A',
                'Ȃ': 'A',
                'Ạ': 'A',
                'Ậ': 'A',
                'Ặ': 'A',
                'Ḁ': 'A',
                'Ą': 'A',
                'Ⱥ': 'A',
                'Ɐ': 'A',
                'Ꜳ': 'AA',
                'Æ': 'AE',
                'Ǽ': 'AE',
                'Ǣ': 'AE',
                'Ꜵ': 'AO',
                'Ꜷ': 'AU',
                'Ꜹ': 'AV',
                'Ꜻ': 'AV',
                'Ꜽ': 'AY',
                '\u24B7': 'B',
                'Ｂ': 'B',
                'Ḃ': 'B',
                'Ḅ': 'B',
                'Ḇ': 'B',
                'Ƀ': 'B',
                'Ƃ': 'B',
                'Ɓ': 'B',
                '\u24B8': 'C',
                'Ｃ': 'C',
                'Ć': 'C',
                'Ĉ': 'C',
                'Ċ': 'C',
                'Č': 'C',
                'Ç': 'C',
                'Ḉ': 'C',
                'Ƈ': 'C',
                'Ȼ': 'C',
                'Ꜿ': 'C',
                '\u24B9': 'D',
                'Ｄ': 'D',
                'Ḋ': 'D',
                'Ď': 'D',
                'Ḍ': 'D',
                'Ḑ': 'D',
                'Ḓ': 'D',
                'Ḏ': 'D',
                'Đ': 'D',
                'Ƌ': 'D',
                'Ɗ': 'D',
                'Ɖ': 'D',
                'Ꝺ': 'D',
                'Ǳ': 'DZ',
                'Ǆ': 'DZ',
                'ǲ': 'Dz',
                'ǅ': 'Dz',
                '\u24BA': 'E',
                'Ｅ': 'E',
                'È': 'E',
                'É': 'E',
                'Ê': 'E',
                'Ề': 'E',
                'Ế': 'E',
                'Ễ': 'E',
                'Ể': 'E',
                'Ẽ': 'E',
                'Ē': 'E',
                'Ḕ': 'E',
                'Ḗ': 'E',
                'Ĕ': 'E',
                'Ė': 'E',
                'Ë': 'E',
                'Ẻ': 'E',
                'Ě': 'E',
                'Ȅ': 'E',
                'Ȇ': 'E',
                'Ẹ': 'E',
                'Ệ': 'E',
                'Ȩ': 'E',
                'Ḝ': 'E',
                'Ę': 'E',
                'Ḙ': 'E',
                'Ḛ': 'E',
                'Ɛ': 'E',
                'Ǝ': 'E',
                '\u24BB': 'F',
                'Ｆ': 'F',
                'Ḟ': 'F',
                'Ƒ': 'F',
                'Ꝼ': 'F',
                '\u24BC': 'G',
                'Ｇ': 'G',
                'Ǵ': 'G',
                'Ĝ': 'G',
                'Ḡ': 'G',
                'Ğ': 'G',
                'Ġ': 'G',
                'Ǧ': 'G',
                'Ģ': 'G',
                'Ǥ': 'G',
                'Ɠ': 'G',
                'Ꞡ': 'G',
                'Ᵹ': 'G',
                'Ꝿ': 'G',
                '\u24BD': 'H',
                'Ｈ': 'H',
                'Ĥ': 'H',
                'Ḣ': 'H',
                'Ḧ': 'H',
                'Ȟ': 'H',
                'Ḥ': 'H',
                'Ḩ': 'H',
                'Ḫ': 'H',
                'Ħ': 'H',
                'Ⱨ': 'H',
                'Ⱶ': 'H',
                'Ɥ': 'H',
                '\u24BE': 'I',
                'Ｉ': 'I',
                'Ì': 'I',
                'Í': 'I',
                'Î': 'I',
                'Ĩ': 'I',
                'Ī': 'I',
                'Ĭ': 'I',
                'İ': 'I',
                'Ï': 'I',
                'Ḯ': 'I',
                'Ỉ': 'I',
                'Ǐ': 'I',
                'Ȉ': 'I',
                'Ȋ': 'I',
                'Ị': 'I',
                'Į': 'I',
                'Ḭ': 'I',
                'Ɨ': 'I',
                '\u24BF': 'J',
                'Ｊ': 'J',
                'Ĵ': 'J',
                'Ɉ': 'J',
                '\u24C0': 'K',
                'Ｋ': 'K',
                'Ḱ': 'K',
                'Ǩ': 'K',
                'Ḳ': 'K',
                'Ķ': 'K',
                'Ḵ': 'K',
                'Ƙ': 'K',
                'Ⱪ': 'K',
                'Ꝁ': 'K',
                'Ꝃ': 'K',
                'Ꝅ': 'K',
                'Ꞣ': 'K',
                '\u24C1': 'L',
                'Ｌ': 'L',
                'Ŀ': 'L',
                'Ĺ': 'L',
                'Ľ': 'L',
                'Ḷ': 'L',
                'Ḹ': 'L',
                'Ļ': 'L',
                'Ḽ': 'L',
                'Ḻ': 'L',
                'Ł': 'L',
                'Ƚ': 'L',
                'Ɫ': 'L',
                'Ⱡ': 'L',
                'Ꝉ': 'L',
                'Ꝇ': 'L',
                'Ꞁ': 'L',
                'Ǉ': 'LJ',
                'ǈ': 'Lj',
                '\u24C2': 'M',
                'Ｍ': 'M',
                'Ḿ': 'M',
                'Ṁ': 'M',
                'Ṃ': 'M',
                'Ɱ': 'M',
                'Ɯ': 'M',
                '\u24C3': 'N',
                'Ｎ': 'N',
                'Ǹ': 'N',
                'Ń': 'N',
                'Ñ': 'N',
                'Ṅ': 'N',
                'Ň': 'N',
                'Ṇ': 'N',
                'Ņ': 'N',
                'Ṋ': 'N',
                'Ṉ': 'N',
                'Ƞ': 'N',
                'Ɲ': 'N',
                'Ꞑ': 'N',
                'Ꞥ': 'N',
                'Ǌ': 'NJ',
                'ǋ': 'Nj',
                '\u24C4': 'O',
                'Ｏ': 'O',
                'Ò': 'O',
                'Ó': 'O',
                'Ô': 'O',
                'Ồ': 'O',
                'Ố': 'O',
                'Ỗ': 'O',
                'Ổ': 'O',
                'Õ': 'O',
                'Ṍ': 'O',
                'Ȭ': 'O',
                'Ṏ': 'O',
                'Ō': 'O',
                'Ṑ': 'O',
                'Ṓ': 'O',
                'Ŏ': 'O',
                'Ȯ': 'O',
                'Ȱ': 'O',
                'Ö': 'O',
                'Ȫ': 'O',
                'Ỏ': 'O',
                'Ő': 'O',
                'Ǒ': 'O',
                'Ȍ': 'O',
                'Ȏ': 'O',
                'Ơ': 'O',
                'Ờ': 'O',
                'Ớ': 'O',
                'Ỡ': 'O',
                'Ở': 'O',
                'Ợ': 'O',
                'Ọ': 'O',
                'Ộ': 'O',
                'Ǫ': 'O',
                'Ǭ': 'O',
                'Ø': 'O',
                'Ǿ': 'O',
                'Ɔ': 'O',
                'Ɵ': 'O',
                'Ꝋ': 'O',
                'Ꝍ': 'O',
                'Ƣ': 'OI',
                'Ꝏ': 'OO',
                'Ȣ': 'OU',
                '\u24C5': 'P',
                'Ｐ': 'P',
                'Ṕ': 'P',
                'Ṗ': 'P',
                'Ƥ': 'P',
                'Ᵽ': 'P',
                'Ꝑ': 'P',
                'Ꝓ': 'P',
                'Ꝕ': 'P',
                '\u24C6': 'Q',
                'Ｑ': 'Q',
                'Ꝗ': 'Q',
                'Ꝙ': 'Q',
                'Ɋ': 'Q',
                '\u24C7': 'R',
                'Ｒ': 'R',
                'Ŕ': 'R',
                'Ṙ': 'R',
                'Ř': 'R',
                'Ȑ': 'R',
                'Ȓ': 'R',
                'Ṛ': 'R',
                'Ṝ': 'R',
                'Ŗ': 'R',
                'Ṟ': 'R',
                'Ɍ': 'R',
                'Ɽ': 'R',
                'Ꝛ': 'R',
                'Ꞧ': 'R',
                'Ꞃ': 'R',
                '\u24C8': 'S',
                'Ｓ': 'S',
                'ẞ': 'S',
                'Ś': 'S',
                'Ṥ': 'S',
                'Ŝ': 'S',
                'Ṡ': 'S',
                'Š': 'S',
                'Ṧ': 'S',
                'Ṣ': 'S',
                'Ṩ': 'S',
                'Ș': 'S',
                'Ş': 'S',
                'Ȿ': 'S',
                'Ꞩ': 'S',
                'Ꞅ': 'S',
                '\u24C9': 'T',
                'Ｔ': 'T',
                'Ṫ': 'T',
                'Ť': 'T',
                'Ṭ': 'T',
                'Ț': 'T',
                'Ţ': 'T',
                'Ṱ': 'T',
                'Ṯ': 'T',
                'Ŧ': 'T',
                'Ƭ': 'T',
                'Ʈ': 'T',
                'Ⱦ': 'T',
                'Ꞇ': 'T',
                'Ꜩ': 'TZ',
                '\u24CA': 'U',
                'Ｕ': 'U',
                'Ù': 'U',
                'Ú': 'U',
                'Û': 'U',
                'Ũ': 'U',
                'Ṹ': 'U',
                'Ū': 'U',
                'Ṻ': 'U',
                'Ŭ': 'U',
                'Ü': 'U',
                'Ǜ': 'U',
                'Ǘ': 'U',
                'Ǖ': 'U',
                'Ǚ': 'U',
                'Ủ': 'U',
                'Ů': 'U',
                'Ű': 'U',
                'Ǔ': 'U',
                'Ȕ': 'U',
                'Ȗ': 'U',
                'Ư': 'U',
                'Ừ': 'U',
                'Ứ': 'U',
                'Ữ': 'U',
                'Ử': 'U',
                'Ự': 'U',
                'Ụ': 'U',
                'Ṳ': 'U',
                'Ų': 'U',
                'Ṷ': 'U',
                'Ṵ': 'U',
                'Ʉ': 'U',
                '\u24CB': 'V',
                'Ｖ': 'V',
                'Ṽ': 'V',
                'Ṿ': 'V',
                'Ʋ': 'V',
                'Ꝟ': 'V',
                'Ʌ': 'V',
                'Ꝡ': 'VY',
                '\u24CC': 'W',
                'Ｗ': 'W',
                'Ẁ': 'W',
                'Ẃ': 'W',
                'Ŵ': 'W',
                'Ẇ': 'W',
                'Ẅ': 'W',
                'Ẉ': 'W',
                'Ⱳ': 'W',
                '\u24CD': 'X',
                'Ｘ': 'X',
                'Ẋ': 'X',
                'Ẍ': 'X',
                '\u24CE': 'Y',
                'Ｙ': 'Y',
                'Ỳ': 'Y',
                'Ý': 'Y',
                'Ŷ': 'Y',
                'Ỹ': 'Y',
                'Ȳ': 'Y',
                'Ẏ': 'Y',
                'Ÿ': 'Y',
                'Ỷ': 'Y',
                'Ỵ': 'Y',
                'Ƴ': 'Y',
                'Ɏ': 'Y',
                'Ỿ': 'Y',
                '\u24CF': 'Z',
                'Ｚ': 'Z',
                'Ź': 'Z',
                'Ẑ': 'Z',
                'Ż': 'Z',
                'Ž': 'Z',
                'Ẓ': 'Z',
                'Ẕ': 'Z',
                'Ƶ': 'Z',
                'Ȥ': 'Z',
                'Ɀ': 'Z',
                'Ⱬ': 'Z',
                'Ꝣ': 'Z',
                '\u24D0': 'a',
                'ａ': 'a',
                'ẚ': 'a',
                'à': 'a',
                'á': 'a',
                'â': 'a',
                'ầ': 'a',
                'ấ': 'a',
                'ẫ': 'a',
                'ẩ': 'a',
                'ã': 'a',
                'ā': 'a',
                'ă': 'a',
                'ằ': 'a',
                'ắ': 'a',
                'ẵ': 'a',
                'ẳ': 'a',
                'ȧ': 'a',
                'ǡ': 'a',
                'ä': 'a',
                'ǟ': 'a',
                'ả': 'a',
                'å': 'a',
                'ǻ': 'a',
                'ǎ': 'a',
                'ȁ': 'a',
                'ȃ': 'a',
                'ạ': 'a',
                'ậ': 'a',
                'ặ': 'a',
                'ḁ': 'a',
                'ą': 'a',
                'ⱥ': 'a',
                'ɐ': 'a',
                'ꜳ': 'aa',
                'æ': 'ae',
                'ǽ': 'ae',
                'ǣ': 'ae',
                'ꜵ': 'ao',
                'ꜷ': 'au',
                'ꜹ': 'av',
                'ꜻ': 'av',
                'ꜽ': 'ay',
                '\u24D1': 'b',
                'ｂ': 'b',
                'ḃ': 'b',
                'ḅ': 'b',
                'ḇ': 'b',
                'ƀ': 'b',
                'ƃ': 'b',
                'ɓ': 'b',
                '\u24D2': 'c',
                'ｃ': 'c',
                'ć': 'c',
                'ĉ': 'c',
                'ċ': 'c',
                'č': 'c',
                'ç': 'c',
                'ḉ': 'c',
                'ƈ': 'c',
                'ȼ': 'c',
                'ꜿ': 'c',
                'ↄ': 'c',
                '\u24D3': 'd',
                'ｄ': 'd',
                'ḋ': 'd',
                'ď': 'd',
                'ḍ': 'd',
                'ḑ': 'd',
                'ḓ': 'd',
                'ḏ': 'd',
                'đ': 'd',
                'ƌ': 'd',
                'ɖ': 'd',
                'ɗ': 'd',
                'ꝺ': 'd',
                'ǳ': 'dz',
                'ǆ': 'dz',
                '\u24D4': 'e',
                'ｅ': 'e',
                'è': 'e',
                'é': 'e',
                'ê': 'e',
                'ề': 'e',
                'ế': 'e',
                'ễ': 'e',
                'ể': 'e',
                'ẽ': 'e',
                'ē': 'e',
                'ḕ': 'e',
                'ḗ': 'e',
                'ĕ': 'e',
                'ė': 'e',
                'ë': 'e',
                'ẻ': 'e',
                'ě': 'e',
                'ȅ': 'e',
                'ȇ': 'e',
                'ẹ': 'e',
                'ệ': 'e',
                'ȩ': 'e',
                'ḝ': 'e',
                'ę': 'e',
                'ḙ': 'e',
                'ḛ': 'e',
                'ɇ': 'e',
                'ɛ': 'e',
                'ǝ': 'e',
                '\u24D5': 'f',
                'ｆ': 'f',
                'ḟ': 'f',
                'ƒ': 'f',
                'ꝼ': 'f',
                '\u24D6': 'g',
                'ｇ': 'g',
                'ǵ': 'g',
                'ĝ': 'g',
                'ḡ': 'g',
                'ğ': 'g',
                'ġ': 'g',
                'ǧ': 'g',
                'ģ': 'g',
                'ǥ': 'g',
                'ɠ': 'g',
                'ꞡ': 'g',
                'ᵹ': 'g',
                'ꝿ': 'g',
                '\u24D7': 'h',
                'ｈ': 'h',
                'ĥ': 'h',
                'ḣ': 'h',
                'ḧ': 'h',
                'ȟ': 'h',
                'ḥ': 'h',
                'ḩ': 'h',
                'ḫ': 'h',
                'ẖ': 'h',
                'ħ': 'h',
                'ⱨ': 'h',
                'ⱶ': 'h',
                'ɥ': 'h',
                'ƕ': 'hv',
                '\u24D8': 'i',
                'ｉ': 'i',
                'ì': 'i',
                'í': 'i',
                'î': 'i',
                'ĩ': 'i',
                'ī': 'i',
                'ĭ': 'i',
                'ï': 'i',
                'ḯ': 'i',
                'ỉ': 'i',
                'ǐ': 'i',
                'ȉ': 'i',
                'ȋ': 'i',
                'ị': 'i',
                'į': 'i',
                'ḭ': 'i',
                'ɨ': 'i',
                'ı': 'i',
                '\u24D9': 'j',
                'ｊ': 'j',
                'ĵ': 'j',
                'ǰ': 'j',
                'ɉ': 'j',
                '\u24DA': 'k',
                'ｋ': 'k',
                'ḱ': 'k',
                'ǩ': 'k',
                'ḳ': 'k',
                'ķ': 'k',
                'ḵ': 'k',
                'ƙ': 'k',
                'ⱪ': 'k',
                'ꝁ': 'k',
                'ꝃ': 'k',
                'ꝅ': 'k',
                'ꞣ': 'k',
                '\u24DB': 'l',
                'ｌ': 'l',
                'ŀ': 'l',
                'ĺ': 'l',
                'ľ': 'l',
                'ḷ': 'l',
                'ḹ': 'l',
                'ļ': 'l',
                'ḽ': 'l',
                'ḻ': 'l',
                'ſ': 'l',
                'ł': 'l',
                'ƚ': 'l',
                'ɫ': 'l',
                'ⱡ': 'l',
                'ꝉ': 'l',
                'ꞁ': 'l',
                'ꝇ': 'l',
                'ǉ': 'lj',
                '\u24DC': 'm',
                'ｍ': 'm',
                'ḿ': 'm',
                'ṁ': 'm',
                'ṃ': 'm',
                'ɱ': 'm',
                'ɯ': 'm',
                '\u24DD': 'n',
                'ｎ': 'n',
                'ǹ': 'n',
                'ń': 'n',
                'ñ': 'n',
                'ṅ': 'n',
                'ň': 'n',
                'ṇ': 'n',
                'ņ': 'n',
                'ṋ': 'n',
                'ṉ': 'n',
                'ƞ': 'n',
                'ɲ': 'n',
                'ŉ': 'n',
                'ꞑ': 'n',
                'ꞥ': 'n',
                'ǌ': 'nj',
                '\u24DE': 'o',
                'ｏ': 'o',
                'ò': 'o',
                'ó': 'o',
                'ô': 'o',
                'ồ': 'o',
                'ố': 'o',
                'ỗ': 'o',
                'ổ': 'o',
                'õ': 'o',
                'ṍ': 'o',
                'ȭ': 'o',
                'ṏ': 'o',
                'ō': 'o',
                'ṑ': 'o',
                'ṓ': 'o',
                'ŏ': 'o',
                'ȯ': 'o',
                'ȱ': 'o',
                'ö': 'o',
                'ȫ': 'o',
                'ỏ': 'o',
                'ő': 'o',
                'ǒ': 'o',
                'ȍ': 'o',
                'ȏ': 'o',
                'ơ': 'o',
                'ờ': 'o',
                'ớ': 'o',
                'ỡ': 'o',
                'ở': 'o',
                'ợ': 'o',
                'ọ': 'o',
                'ộ': 'o',
                'ǫ': 'o',
                'ǭ': 'o',
                'ø': 'o',
                'ǿ': 'o',
                'ɔ': 'o',
                'ꝋ': 'o',
                'ꝍ': 'o',
                'ɵ': 'o',
                'ƣ': 'oi',
                'ȣ': 'ou',
                'ꝏ': 'oo',
                '\u24DF': 'p',
                'ｐ': 'p',
                'ṕ': 'p',
                'ṗ': 'p',
                'ƥ': 'p',
                'ᵽ': 'p',
                'ꝑ': 'p',
                'ꝓ': 'p',
                'ꝕ': 'p',
                '\u24E0': 'q',
                'ｑ': 'q',
                'ɋ': 'q',
                'ꝗ': 'q',
                'ꝙ': 'q',
                '\u24E1': 'r',
                'ｒ': 'r',
                'ŕ': 'r',
                'ṙ': 'r',
                'ř': 'r',
                'ȑ': 'r',
                'ȓ': 'r',
                'ṛ': 'r',
                'ṝ': 'r',
                'ŗ': 'r',
                'ṟ': 'r',
                'ɍ': 'r',
                'ɽ': 'r',
                'ꝛ': 'r',
                'ꞧ': 'r',
                'ꞃ': 'r',
                '\u24E2': 's',
                'ｓ': 's',
                'ß': 's',
                'ś': 's',
                'ṥ': 's',
                'ŝ': 's',
                'ṡ': 's',
                'š': 's',
                'ṧ': 's',
                'ṣ': 's',
                'ṩ': 's',
                'ș': 's',
                'ş': 's',
                'ȿ': 's',
                'ꞩ': 's',
                'ꞅ': 's',
                'ẛ': 's',
                '\u24E3': 't',
                'ｔ': 't',
                'ṫ': 't',
                'ẗ': 't',
                'ť': 't',
                'ṭ': 't',
                'ț': 't',
                'ţ': 't',
                'ṱ': 't',
                'ṯ': 't',
                'ŧ': 't',
                'ƭ': 't',
                'ʈ': 't',
                'ⱦ': 't',
                'ꞇ': 't',
                'ꜩ': 'tz',
                '\u24E4': 'u',
                'ｕ': 'u',
                'ù': 'u',
                'ú': 'u',
                'û': 'u',
                'ũ': 'u',
                'ṹ': 'u',
                'ū': 'u',
                'ṻ': 'u',
                'ŭ': 'u',
                'ü': 'u',
                'ǜ': 'u',
                'ǘ': 'u',
                'ǖ': 'u',
                'ǚ': 'u',
                'ủ': 'u',
                'ů': 'u',
                'ű': 'u',
                'ǔ': 'u',
                'ȕ': 'u',
                'ȗ': 'u',
                'ư': 'u',
                'ừ': 'u',
                'ứ': 'u',
                'ữ': 'u',
                'ử': 'u',
                'ự': 'u',
                'ụ': 'u',
                'ṳ': 'u',
                'ų': 'u',
                'ṷ': 'u',
                'ṵ': 'u',
                'ʉ': 'u',
                '\u24E5': 'v',
                'ｖ': 'v',
                'ṽ': 'v',
                'ṿ': 'v',
                'ʋ': 'v',
                'ꝟ': 'v',
                'ʌ': 'v',
                'ꝡ': 'vy',
                '\u24E6': 'w',
                'ｗ': 'w',
                'ẁ': 'w',
                'ẃ': 'w',
                'ŵ': 'w',
                'ẇ': 'w',
                'ẅ': 'w',
                'ẘ': 'w',
                'ẉ': 'w',
                'ⱳ': 'w',
                '\u24E7': 'x',
                'ｘ': 'x',
                'ẋ': 'x',
                'ẍ': 'x',
                '\u24E8': 'y',
                'ｙ': 'y',
                'ỳ': 'y',
                'ý': 'y',
                'ŷ': 'y',
                'ỹ': 'y',
                'ȳ': 'y',
                'ẏ': 'y',
                'ÿ': 'y',
                'ỷ': 'y',
                'ẙ': 'y',
                'ỵ': 'y',
                'ƴ': 'y',
                'ɏ': 'y',
                'ỿ': 'y',
                '\u24E9': 'z',
                'ｚ': 'z',
                'ź': 'z',
                'ẑ': 'z',
                'ż': 'z',
                'ž': 'z',
                'ẓ': 'z',
                'ẕ': 'z',
                'ƶ': 'z',
                'ȥ': 'z',
                'ɀ': 'z',
                'ⱬ': 'z',
                'ꝣ': 'z',
                'Ά': 'Α',
                'Έ': 'Ε',
                'Ή': 'Η',
                'Ί': 'Ι',
                'Ϊ': 'Ι',
                'Ό': 'Ο',
                'Ύ': 'Υ',
                'Ϋ': 'Υ',
                'Ώ': 'Ω',
                'ά': 'α',
                'έ': 'ε',
                'ή': 'η',
                'ί': 'ι',
                'ϊ': 'ι',
                'ΐ': 'ι',
                'ό': 'ο',
                'ύ': 'υ',
                'ϋ': 'υ',
                'ΰ': 'υ',
                'ω': 'ω',
                'ς': 'σ'
            };
            return diacritics;
        });
        S2.define('select2/data/base', ['../utils'], function (Utils) {
            function BaseAdapter($element, options) {
                BaseAdapter.__super__.constructor.call(this);
            }
            Utils.Extend(BaseAdapter, Utils.Observable);
            BaseAdapter.prototype.current = function (callback) {
                throw new Error('The `current` method must be defined in child classes.');
            };
            BaseAdapter.prototype.query = function (params, callback) {
                throw new Error('The `query` method must be defined in child classes.');
            };
            BaseAdapter.prototype.bind = function (container, $container) {
            };
            BaseAdapter.prototype.destroy = function () {
            };
            BaseAdapter.prototype.generateResultId = function (container, data) {
                var id = container.id + '-result-';
                id += Utils.generateChars(4);
                if (data.id != null) {
                    id += '-' + data.id.toString();
                } else {
                    id += '-' + Utils.generateChars(4);
                }
                return id;
            };
            return BaseAdapter;
        });
        S2.define('select2/data/select', [
            './base',
            '../utils',
            'jquery'
        ], function (BaseAdapter, Utils, $) {
            function SelectAdapter($element, options) {
                this.$element = $element;
                this.options = options;
                SelectAdapter.__super__.constructor.call(this);
            }
            Utils.Extend(SelectAdapter, BaseAdapter);
            SelectAdapter.prototype.current = function (callback) {
                var data = [];
                var self = this;
                this.$element.find(':selected').each(function () {
                    var $option = $(this);
                    var option = self.item($option);
                    data.push(option);
                });
                callback(data);
            };
            SelectAdapter.prototype.select = function (data) {
                var self = this;
                data.selected = true;
                if ($(data.element).is('option')) {
                    data.element.selected = true;
                    this.$element.trigger('change');
                    return;
                }
                if (this.$element.prop('multiple')) {
                    this.current(function (currentData) {
                        var val = [];
                        data = [data];
                        data.push.apply(data, currentData);
                        for (var d = 0; d < data.length; d++) {
                            var id = data[d].id;
                            if ($.inArray(id, val) === -1) {
                                val.push(id);
                            }
                        }
                        self.$element.val(val);
                        self.$element.trigger('change');
                    });
                } else {
                    var val = data.id;
                    this.$element.val(val);
                    this.$element.trigger('change');
                }
            };
            SelectAdapter.prototype.unselect = function (data) {
                var self = this;
                if (!this.$element.prop('multiple')) {
                    return;
                }
                data.selected = false;
                if ($(data.element).is('option')) {
                    data.element.selected = false;
                    this.$element.trigger('change');
                    return;
                }
                this.current(function (currentData) {
                    var val = [];
                    for (var d = 0; d < currentData.length; d++) {
                        var id = currentData[d].id;
                        if (id !== data.id && $.inArray(id, val) === -1) {
                            val.push(id);
                        }
                    }
                    self.$element.val(val);
                    self.$element.trigger('change');
                });
            };
            SelectAdapter.prototype.bind = function (container, $container) {
                var self = this;
                this.container = container;
                container.on('select', function (params) {
                    self.select(params.data);
                });
                container.on('unselect', function (params) {
                    self.unselect(params.data);
                });
            };
            SelectAdapter.prototype.destroy = function () {
                this.$element.find('*').each(function () {
                    $.removeData(this, 'data');
                });
            };
            SelectAdapter.prototype.query = function (params, callback) {
                var data = [];
                var self = this;
                var $options = this.$element.children();
                $options.each(function () {
                    var $option = $(this);
                    if (!$option.is('option') && !$option.is('optgroup')) {
                        return;
                    }
                    var option = self.item($option);
                    var matches = self.matches(params, option);
                    if (matches !== null) {
                        data.push(matches);
                    }
                });
                callback({ results: data });
            };
            SelectAdapter.prototype.addOptions = function ($options) {
                Utils.appendMany(this.$element, $options);
            };
            SelectAdapter.prototype.option = function (data) {
                var option;
                if (data.children) {
                    option = document.createElement('optgroup');
                    option.label = data.text;
                } else {
                    option = document.createElement('option');
                    if (option.textContent !== undefined) {
                        option.textContent = data.text;
                    } else {
                        option.innerText = data.text;
                    }
                }
                if (data.id) {
                    option.value = data.id;
                }
                if (data.disabled) {
                    option.disabled = true;
                }
                if (data.selected) {
                    option.selected = true;
                }
                if (data.title) {
                    option.title = data.title;
                }
                var $option = $(option);
                var normalizedData = this._normalizeItem(data);
                normalizedData.element = option;
                $.data(option, 'data', normalizedData);
                return $option;
            };
            SelectAdapter.prototype.item = function ($option) {
                var data = {};
                data = $.data($option[0], 'data');
                if (data != null) {
                    return data;
                }
                if ($option.is('option')) {
                    data = {
                        id: $option.val(),
                        text: $option.text(),
                        disabled: $option.prop('disabled'),
                        selected: $option.prop('selected'),
                        title: $option.prop('title')
                    };
                } else if ($option.is('optgroup')) {
                    data = {
                        text: $option.prop('label'),
                        children: [],
                        title: $option.prop('title')
                    };
                    var $children = $option.children('option');
                    var children = [];
                    for (var c = 0; c < $children.length; c++) {
                        var $child = $($children[c]);
                        var child = this.item($child);
                        children.push(child);
                    }
                    data.children = children;
                }
                data = this._normalizeItem(data);
                data.element = $option[0];
                $.data($option[0], 'data', data);
                return data;
            };
            SelectAdapter.prototype._normalizeItem = function (item) {
                if (!$.isPlainObject(item)) {
                    item = {
                        id: item,
                        text: item
                    };
                }
                item = $.extend({}, { text: '' }, item);
                var defaults = {
                    selected: false,
                    disabled: false
                };
                if (item.id != null) {
                    item.id = item.id.toString();
                }
                if (item.text != null) {
                    item.text = item.text.toString();
                }
                if (item._resultId == null && item.id && this.container != null) {
                    item._resultId = this.generateResultId(this.container, item);
                }
                return $.extend({}, defaults, item);
            };
            SelectAdapter.prototype.matches = function (params, data) {
                var matcher = this.options.get('matcher');
                return matcher(params, data);
            };
            return SelectAdapter;
        });
        S2.define('select2/data/array', [
            './select',
            '../utils',
            'jquery'
        ], function (SelectAdapter, Utils, $) {
            function ArrayAdapter($element, options) {
                var data = options.get('data') || [];
                ArrayAdapter.__super__.constructor.call(this, $element, options);
                this.addOptions(this.convertToOptions(data));
            }
            Utils.Extend(ArrayAdapter, SelectAdapter);
            ArrayAdapter.prototype.select = function (data) {
                var $option = this.$element.find('option').filter(function (i, elm) {
                    return elm.value == data.id.toString();
                });
                if ($option.length === 0) {
                    $option = this.option(data);
                    this.addOptions($option);
                }
                ArrayAdapter.__super__.select.call(this, data);
            };
            ArrayAdapter.prototype.convertToOptions = function (data) {
                var self = this;
                var $existing = this.$element.find('option');
                var existingIds = $existing.map(function () {
                    return self.item($(this)).id;
                }).get();
                var $options = [];
                function onlyItem(item) {
                    return function () {
                        return $(this).val() == item.id;
                    };
                }
                for (var d = 0; d < data.length; d++) {
                    var item = this._normalizeItem(data[d]);
                    if ($.inArray(item.id, existingIds) >= 0) {
                        var $existingOption = $existing.filter(onlyItem(item));
                        var existingData = this.item($existingOption);
                        var newData = $.extend(true, {}, item, existingData);
                        var $newOption = this.option(newData);
                        $existingOption.replaceWith($newOption);
                        continue;
                    }
                    var $option = this.option(item);
                    if (item.children) {
                        var $children = this.convertToOptions(item.children);
                        Utils.appendMany($option, $children);
                    }
                    $options.push($option);
                }
                return $options;
            };
            return ArrayAdapter;
        });
        S2.define('select2/data/ajax', [
            './array',
            '../utils',
            'jquery'
        ], function (ArrayAdapter, Utils, $) {
            function AjaxAdapter($element, options) {
                this.ajaxOptions = this._applyDefaults(options.get('ajax'));
                if (this.ajaxOptions.processResults != null) {
                    this.processResults = this.ajaxOptions.processResults;
                }
                AjaxAdapter.__super__.constructor.call(this, $element, options);
            }
            Utils.Extend(AjaxAdapter, ArrayAdapter);
            AjaxAdapter.prototype._applyDefaults = function (options) {
                var defaults = {
                    data: function (params) {
                        return $.extend({}, params, { q: params.term });
                    },
                    transport: function (params, success, failure) {
                        var $request = $.ajax(params);
                        $request.then(success);
                        $request.fail(failure);
                        return $request;
                    }
                };
                return $.extend({}, defaults, options, true);
            };
            AjaxAdapter.prototype.processResults = function (results) {
                return results;
            };
            AjaxAdapter.prototype.query = function (params, callback) {
                var matches = [];
                var self = this;
                if (this._request != null) {
                    if ($.isFunction(this._request.abort)) {
                        this._request.abort();
                    }
                    this._request = null;
                }
                var options = $.extend({ type: 'GET' }, this.ajaxOptions);
                if (typeof options.url === 'function') {
                    options.url = options.url.call(this.$element, params);
                }
                if (typeof options.data === 'function') {
                    options.data = options.data.call(this.$element, params);
                }
                function request() {
                    var $request = options.transport(options, function (data) {
                        var results = self.processResults(data, params);
                        if (self.options.get('debug') && window.console && console.error) {
                            if (!results || !results.results || !$.isArray(results.results)) {
                                console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
                            }
                        }
                        callback(results);
                    }, function () {
                        self.trigger('results:message', { message: 'errorLoading' });
                    });
                    self._request = $request;
                }
                if (this.ajaxOptions.delay && params.term !== '') {
                    if (this._queryTimeout) {
                        window.clearTimeout(this._queryTimeout);
                    }
                    this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
                } else {
                    request();
                }
            };
            return AjaxAdapter;
        });
        S2.define('select2/data/tags', ['jquery'], function ($) {
            function Tags(decorated, $element, options) {
                var tags = options.get('tags');
                var createTag = options.get('createTag');
                if (createTag !== undefined) {
                    this.createTag = createTag;
                }
                var insertTag = options.get('insertTag');
                if (insertTag !== undefined) {
                    this.insertTag = insertTag;
                }
                decorated.call(this, $element, options);
                if ($.isArray(tags)) {
                    for (var t = 0; t < tags.length; t++) {
                        var tag = tags[t];
                        var item = this._normalizeItem(tag);
                        var $option = this.option(item);
                        this.$element.append($option);
                    }
                }
            }
            Tags.prototype.query = function (decorated, params, callback) {
                var self = this;
                this._removeOldTags();
                if (params.term == null || params.page != null) {
                    decorated.call(this, params, callback);
                    return;
                }
                function wrapper(obj, child) {
                    var data = obj.results;
                    for (var i = 0; i < data.length; i++) {
                        var option = data[i];
                        var checkChildren = option.children != null && !wrapper({ results: option.children }, true);
                        var checkText = option.text === params.term;
                        if (checkText || checkChildren) {
                            if (child) {
                                return false;
                            }
                            obj.data = data;
                            callback(obj);
                            return;
                        }
                    }
                    if (child) {
                        return true;
                    }
                    var tag = self.createTag(params);
                    if (tag != null) {
                        var $option = self.option(tag);
                        $option.attr('data-select2-tag', true);
                        self.addOptions([$option]);
                        self.insertTag(data, tag);
                    }
                    obj.results = data;
                    callback(obj);
                }
                decorated.call(this, params, wrapper);
            };
            Tags.prototype.createTag = function (decorated, params) {
                var term = $.trim(params.term);
                if (term === '') {
                    return null;
                }
                return {
                    id: term,
                    text: term
                };
            };
            Tags.prototype.insertTag = function (_, data, tag) {
                data.unshift(tag);
            };
            Tags.prototype._removeOldTags = function (_) {
                var tag = this._lastTag;
                var $options = this.$element.find('option[data-select2-tag]');
                $options.each(function () {
                    if (this.selected) {
                        return;
                    }
                    $(this).remove();
                });
            };
            return Tags;
        });
        S2.define('select2/data/tokenizer', ['jquery'], function ($) {
            function Tokenizer(decorated, $element, options) {
                var tokenizer = options.get('tokenizer');
                if (tokenizer !== undefined) {
                    this.tokenizer = tokenizer;
                }
                decorated.call(this, $element, options);
            }
            Tokenizer.prototype.bind = function (decorated, container, $container) {
                decorated.call(this, container, $container);
                this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
            };
            Tokenizer.prototype.query = function (decorated, params, callback) {
                var self = this;
                function select(data) {
                    self.trigger('select', { data: data });
                }
                params.term = params.term || '';
                var tokenData = this.tokenizer(params, this.options, select);
                if (tokenData.term !== params.term) {
                    if (this.$search.length) {
                        this.$search.val(tokenData.term);
                        this.$search.focus();
                    }
                    params.term = tokenData.term;
                }
                decorated.call(this, params, callback);
            };
            Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
                var separators = options.get('tokenSeparators') || [];
                var term = params.term;
                var i = 0;
                var createTag = this.createTag || function (params) {
                    return {
                        id: params.term,
                        text: params.term
                    };
                };
                while (i < term.length) {
                    var termChar = term[i];
                    if ($.inArray(termChar, separators) === -1) {
                        i++;
                        continue;
                    }
                    var part = term.substr(0, i);
                    var partParams = $.extend({}, params, { term: part });
                    var data = createTag(partParams);
                    if (data == null) {
                        i++;
                        continue;
                    }
                    callback(data);
                    term = term.substr(i + 1) || '';
                    i = 0;
                }
                return { term: term };
            };
            return Tokenizer;
        });
        S2.define('select2/data/minimumInputLength', [], function () {
            function MinimumInputLength(decorated, $e, options) {
                this.minimumInputLength = options.get('minimumInputLength');
                decorated.call(this, $e, options);
            }
            MinimumInputLength.prototype.query = function (decorated, params, callback) {
                params.term = params.term || '';
                if (params.term.length < this.minimumInputLength) {
                    this.trigger('results:message', {
                        message: 'inputTooShort',
                        args: {
                            minimum: this.minimumInputLength,
                            input: params.term,
                            params: params
                        }
                    });
                    return;
                }
                decorated.call(this, params, callback);
            };
            return MinimumInputLength;
        });
        S2.define('select2/data/maximumInputLength', [], function () {
            function MaximumInputLength(decorated, $e, options) {
                this.maximumInputLength = options.get('maximumInputLength');
                decorated.call(this, $e, options);
            }
            MaximumInputLength.prototype.query = function (decorated, params, callback) {
                params.term = params.term || '';
                if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
                    this.trigger('results:message', {
                        message: 'inputTooLong',
                        args: {
                            maximum: this.maximumInputLength,
                            input: params.term,
                            params: params
                        }
                    });
                    return;
                }
                decorated.call(this, params, callback);
            };
            return MaximumInputLength;
        });
        S2.define('select2/data/maximumSelectionLength', [], function () {
            function MaximumSelectionLength(decorated, $e, options) {
                this.maximumSelectionLength = options.get('maximumSelectionLength');
                decorated.call(this, $e, options);
            }
            MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
                var self = this;
                this.current(function (currentData) {
                    var count = currentData != null ? currentData.length : 0;
                    if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
                        self.trigger('results:message', {
                            message: 'maximumSelected',
                            args: { maximum: self.maximumSelectionLength }
                        });
                        return;
                    }
                    decorated.call(self, params, callback);
                });
            };
            return MaximumSelectionLength;
        });
        S2.define('select2/dropdown', [
            'jquery',
            './utils'
        ], function ($, Utils) {
            function Dropdown($element, options) {
                this.$element = $element;
                this.options = options;
                Dropdown.__super__.constructor.call(this);
            }
            Utils.Extend(Dropdown, Utils.Observable);
            Dropdown.prototype.render = function () {
                var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');
                $dropdown.attr('dir', this.options.get('dir'));
                this.$dropdown = $dropdown;
                return $dropdown;
            };
            Dropdown.prototype.bind = function () {
            };
            Dropdown.prototype.position = function ($dropdown, $container) {
            };
            Dropdown.prototype.destroy = function () {
                this.$dropdown.remove();
            };
            return Dropdown;
        });
        S2.define('select2/dropdown/search', [
            'jquery',
            '../utils'
        ], function ($, Utils) {
            function Search() {
            }
            Search.prototype.render = function (decorated) {
                var $rendered = decorated.call(this);
                var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" />' + '</span>');
                this.$searchContainer = $search;
                this.$search = $search.find('input');
                $rendered.prepend($search);
                return $rendered;
            };
            Search.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                this.$search.on('keydown', function (evt) {
                    self.trigger('keypress', evt);
                    self._keyUpPrevented = evt.isDefaultPrevented();
                });
                this.$search.on('input', function (evt) {
                    $(this).off('keyup');
                });
                this.$search.on('keyup input', function (evt) {
                    self.handleSearch(evt);
                });
                container.on('open', function () {
                    self.$search.attr('tabindex', 0);
                    self.$search.focus();
                    window.setTimeout(function () {
                        self.$search.focus();
                    }, 0);
                });
                container.on('close', function () {
                    self.$search.attr('tabindex', -1);
                    self.$search.val('');
                });
                container.on('results:all', function (params) {
                    if (params.query.term == null || params.query.term === '') {
                        var showSearch = self.showSearch(params);
                        if (showSearch) {
                            self.$searchContainer.removeClass('select2-search--hide');
                        } else {
                            self.$searchContainer.addClass('select2-search--hide');
                        }
                    }
                });
            };
            Search.prototype.handleSearch = function (evt) {
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();
                    this.trigger('query', { term: input });
                }
                this._keyUpPrevented = false;
            };
            Search.prototype.showSearch = function (_, params) {
                return true;
            };
            return Search;
        });
        S2.define('select2/dropdown/hidePlaceholder', [], function () {
            function HidePlaceholder(decorated, $element, options, dataAdapter) {
                this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
                decorated.call(this, $element, options, dataAdapter);
            }
            HidePlaceholder.prototype.append = function (decorated, data) {
                data.results = this.removePlaceholder(data.results);
                decorated.call(this, data);
            };
            HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
                if (typeof placeholder === 'string') {
                    placeholder = {
                        id: '',
                        text: placeholder
                    };
                }
                return placeholder;
            };
            HidePlaceholder.prototype.removePlaceholder = function (_, data) {
                var modifiedData = data.slice(0);
                for (var d = data.length - 1; d >= 0; d--) {
                    var item = data[d];
                    if (this.placeholder.id === item.id) {
                        modifiedData.splice(d, 1);
                    }
                }
                return modifiedData;
            };
            return HidePlaceholder;
        });
        S2.define('select2/dropdown/infiniteScroll', ['jquery'], function ($) {
            function InfiniteScroll(decorated, $element, options, dataAdapter) {
                this.lastParams = {};
                decorated.call(this, $element, options, dataAdapter);
                this.$loadingMore = this.createLoadingMore();
                this.loading = false;
            }
            InfiniteScroll.prototype.append = function (decorated, data) {
                this.$loadingMore.remove();
                this.loading = false;
                decorated.call(this, data);
                if (this.showLoadingMore(data)) {
                    this.$results.append(this.$loadingMore);
                }
            };
            InfiniteScroll.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on('query', function (params) {
                    self.lastParams = params;
                    self.loading = true;
                });
                container.on('query:append', function (params) {
                    self.lastParams = params;
                    self.loading = true;
                });
                this.$results.on('scroll', function () {
                    var isLoadMoreVisible = $.contains(document.documentElement, self.$loadingMore[0]);
                    if (self.loading || !isLoadMoreVisible) {
                        return;
                    }
                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
                    var loadingMoreOffset = self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);
                    if (currentOffset + 50 >= loadingMoreOffset) {
                        self.loadMore();
                    }
                });
            };
            InfiniteScroll.prototype.loadMore = function () {
                this.loading = true;
                var params = $.extend({}, { page: 1 }, this.lastParams);
                params.page++;
                this.trigger('query:append', params);
            };
            InfiniteScroll.prototype.showLoadingMore = function (_, data) {
                return data.pagination && data.pagination.more;
            };
            InfiniteScroll.prototype.createLoadingMore = function () {
                var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="treeitem" aria-disabled="true"></li>');
                var message = this.options.get('translations').get('loadingMore');
                $option.html(message(this.lastParams));
                return $option;
            };
            return InfiniteScroll;
        });
        S2.define('select2/dropdown/attachBody', [
            'jquery',
            '../utils'
        ], function ($, Utils) {
            function AttachBody(decorated, $element, options) {
                this.$dropdownParent = options.get('dropdownParent') || $(document.body);
                decorated.call(this, $element, options);
            }
            AttachBody.prototype.bind = function (decorated, container, $container) {
                var self = this;
                var setupResultsEvents = false;
                decorated.call(this, container, $container);
                container.on('open', function () {
                    self._showDropdown();
                    self._attachPositioningHandler(container);
                    if (!setupResultsEvents) {
                        setupResultsEvents = true;
                        container.on('results:all', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });
                        container.on('results:append', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });
                    }
                });
                container.on('close', function () {
                    self._hideDropdown();
                    self._detachPositioningHandler(container);
                });
                this.$dropdownContainer.on('mousedown', function (evt) {
                    evt.stopPropagation();
                });
            };
            AttachBody.prototype.destroy = function (decorated) {
                decorated.call(this);
                this.$dropdownContainer.remove();
            };
            AttachBody.prototype.position = function (decorated, $dropdown, $container) {
                $dropdown.attr('class', $container.attr('class'));
                $dropdown.removeClass('select2');
                $dropdown.addClass('select2-container--open');
                $dropdown.css({
                    position: 'absolute',
                    top: -999999
                });
                this.$container = $container;
            };
            AttachBody.prototype.render = function (decorated) {
                var $container = $('<span></span>');
                var $dropdown = decorated.call(this);
                $container.append($dropdown);
                this.$dropdownContainer = $container;
                return $container;
            };
            AttachBody.prototype._hideDropdown = function (decorated) {
                this.$dropdownContainer.detach();
            };
            AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
                var self = this;
                var scrollEvent = 'scroll.select2.' + container.id;
                var resizeEvent = 'resize.select2.' + container.id;
                var orientationEvent = 'orientationchange.select2.' + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.each(function () {
                    $(this).data('select2-scroll-position', {
                        x: $(this).scrollLeft(),
                        y: $(this).scrollTop()
                    });
                });
                $watchers.on(scrollEvent, function (ev) {
                    var position = $(this).data('select2-scroll-position');
                    $(this).scrollTop(position.y);
                });
                $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function (e) {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
            };
            AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
                var scrollEvent = 'scroll.select2.' + container.id;
                var resizeEvent = 'resize.select2.' + container.id;
                var orientationEvent = 'orientationchange.select2.' + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.off(scrollEvent);
                $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
            };
            AttachBody.prototype._positionDropdown = function () {
                var $window = $(window);
                var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
                var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
                var newDirection = null;
                var offset = this.$container.offset();
                offset.bottom = offset.top + this.$container.outerHeight(false);
                var container = { height: this.$container.outerHeight(false) };
                container.top = offset.top;
                container.bottom = offset.top + container.height;
                var dropdown = { height: this.$dropdown.outerHeight(false) };
                var viewport = {
                    top: $window.scrollTop(),
                    bottom: $window.scrollTop() + $window.height()
                };
                var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
                var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
                var css = {
                    left: offset.left,
                    top: container.bottom
                };
                var $offsetParent = this.$dropdownParent;
                if ($offsetParent.css('position') === 'static') {
                    $offsetParent = $offsetParent.offsetParent();
                }
                var parentOffset = $offsetParent.offset();
                css.top -= parentOffset.top;
                css.left -= parentOffset.left;
                if (!isCurrentlyAbove && !isCurrentlyBelow) {
                    newDirection = 'below';
                }
                if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
                    newDirection = 'above';
                } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
                    newDirection = 'below';
                }
                if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
                    css.top = container.top - dropdown.height;
                }
                if (newDirection != null) {
                    this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--' + newDirection);
                    this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--' + newDirection);
                }
                this.$dropdownContainer.css(css);
            };
            AttachBody.prototype._resizeDropdown = function () {
                var css = { width: this.$container.outerWidth(false) + 'px' };
                if (this.options.get('dropdownAutoWidth')) {
                    css.minWidth = css.width;
                    css.width = 'auto';
                }
                this.$dropdown.css(css);
            };
            AttachBody.prototype._showDropdown = function (decorated) {
                this.$dropdownContainer.appendTo(this.$dropdownParent);
                this._positionDropdown();
                this._resizeDropdown();
            };
            return AttachBody;
        });
        S2.define('select2/dropdown/minimumResultsForSearch', [], function () {
            function countResults(data) {
                var count = 0;
                for (var d = 0; d < data.length; d++) {
                    var item = data[d];
                    if (item.children) {
                        count += countResults(item.children);
                    } else {
                        count++;
                    }
                }
                return count;
            }
            function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
                this.minimumResultsForSearch = options.get('minimumResultsForSearch');
                if (this.minimumResultsForSearch < 0) {
                    this.minimumResultsForSearch = Infinity;
                }
                decorated.call(this, $element, options, dataAdapter);
            }
            MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
                if (countResults(params.data.results) < this.minimumResultsForSearch) {
                    return false;
                }
                return decorated.call(this, params);
            };
            return MinimumResultsForSearch;
        });
        S2.define('select2/dropdown/selectOnClose', [], function () {
            function SelectOnClose() {
            }
            SelectOnClose.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on('close', function () {
                    self._handleSelectOnClose();
                });
            };
            SelectOnClose.prototype._handleSelectOnClose = function () {
                var $highlightedResults = this.getHighlightedResults();
                if ($highlightedResults.length < 1) {
                    return;
                }
                var data = $highlightedResults.data('data');
                if (data.element != null && data.element.selected || data.element == null && data.selected) {
                    return;
                }
                this.trigger('select', { data: data });
            };
            return SelectOnClose;
        });
        S2.define('select2/dropdown/closeOnSelect', [], function () {
            function CloseOnSelect() {
            }
            CloseOnSelect.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on('select', function (evt) {
                    self._selectTriggered(evt);
                });
                container.on('unselect', function (evt) {
                    self._selectTriggered(evt);
                });
            };
            CloseOnSelect.prototype._selectTriggered = function (_, evt) {
                var originalEvent = evt.originalEvent;
                if (originalEvent && originalEvent.ctrlKey) {
                    return;
                }
                this.trigger('close', {});
            };
            return CloseOnSelect;
        });
        S2.define('select2/i18n/en', [], function () {
            return {
                errorLoading: function () {
                    return 'The results could not be loaded.';
                },
                inputTooLong: function (args) {
                    var overChars = args.input.length - args.maximum;
                    var message = 'Please delete ' + overChars + ' character';
                    if (overChars != 1) {
                        message += 's';
                    }
                    return message;
                },
                inputTooShort: function (args) {
                    var remainingChars = args.minimum - args.input.length;
                    var message = 'Please enter ' + remainingChars + ' or more characters';
                    return message;
                },
                loadingMore: function () {
                    return 'Loading more results\u2026';
                },
                maximumSelected: function (args) {
                    var message = 'You can only select ' + args.maximum + ' item';
                    if (args.maximum != 1) {
                        message += 's';
                    }
                    return message;
                },
                noResults: function () {
                    return 'No results found';
                },
                searching: function () {
                    return 'Searching\u2026';
                }
            };
        });
        S2.define('select2/defaults', [
            'jquery',
            'require',
            './results',
            './selection/single',
            './selection/multiple',
            './selection/placeholder',
            './selection/allowClear',
            './selection/search',
            './selection/eventRelay',
            './utils',
            './translation',
            './diacritics',
            './data/select',
            './data/array',
            './data/ajax',
            './data/tags',
            './data/tokenizer',
            './data/minimumInputLength',
            './data/maximumInputLength',
            './data/maximumSelectionLength',
            './dropdown',
            './dropdown/search',
            './dropdown/hidePlaceholder',
            './dropdown/infiniteScroll',
            './dropdown/attachBody',
            './dropdown/minimumResultsForSearch',
            './dropdown/selectOnClose',
            './dropdown/closeOnSelect',
            './i18n/en'
        ], function ($, require, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, EnglishTranslation) {
            function Defaults() {
                this.reset();
            }
            Defaults.prototype.apply = function (options) {
                options = $.extend(true, {}, this.defaults, options);
                if (options.dataAdapter == null) {
                    if (options.ajax != null) {
                        options.dataAdapter = AjaxData;
                    } else if (options.data != null) {
                        options.dataAdapter = ArrayData;
                    } else {
                        options.dataAdapter = SelectData;
                    }
                    if (options.minimumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
                    }
                    if (options.maximumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
                    }
                    if (options.maximumSelectionLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
                    }
                    if (options.tags) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
                    }
                    if (options.tokenSeparators != null || options.tokenizer != null) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
                    }
                    if (options.query != null) {
                        var Query = require(options.amdBase + 'compat/query');
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
                    }
                    if (options.initSelection != null) {
                        var InitSelection = require(options.amdBase + 'compat/initSelection');
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
                    }
                }
                if (options.resultsAdapter == null) {
                    options.resultsAdapter = ResultsList;
                    if (options.ajax != null) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
                    }
                    if (options.placeholder != null) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
                    }
                    if (options.selectOnClose) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
                    }
                }
                if (options.dropdownAdapter == null) {
                    if (options.multiple) {
                        options.dropdownAdapter = Dropdown;
                    } else {
                        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);
                        options.dropdownAdapter = SearchableDropdown;
                    }
                    if (options.minimumResultsForSearch !== 0) {
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
                    }
                    if (options.closeOnSelect) {
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
                    }
                    if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
                        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
                    }
                    options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
                }
                if (options.selectionAdapter == null) {
                    if (options.multiple) {
                        options.selectionAdapter = MultipleSelection;
                    } else {
                        options.selectionAdapter = SingleSelection;
                    }
                    if (options.placeholder != null) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
                    }
                    if (options.allowClear) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
                    }
                    if (options.multiple) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
                    }
                    if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
                        var ContainerCSS = require(options.amdBase + 'compat/containerCss');
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
                    }
                    options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
                }
                if (typeof options.language === 'string') {
                    if (options.language.indexOf('-') > 0) {
                        var languageParts = options.language.split('-');
                        var baseLanguage = languageParts[0];
                        options.language = [
                            options.language,
                            baseLanguage
                        ];
                    } else {
                        options.language = [options.language];
                    }
                }
                if ($.isArray(options.language)) {
                    var languages = new Translation();
                    options.language.push('en');
                    var languageNames = options.language;
                    for (var l = 0; l < languageNames.length; l++) {
                        var name = languageNames[l];
                        var language = {};
                        try {
                            language = Translation.loadPath(name);
                        } catch (e) {
                            try {
                                name = this.defaults.amdLanguageBase + name;
                                language = Translation.loadPath(name);
                            } catch (ex) {
                                if (options.debug && window.console && console.warn) {
                                    console.warn('Select2: The language file for "' + name + '" could not be ' + 'automatically loaded. A fallback will be used instead.');
                                }
                                continue;
                            }
                        }
                        languages.extend(language);
                    }
                    options.translations = languages;
                } else {
                    var baseTranslation = Translation.loadPath(this.defaults.amdLanguageBase + 'en');
                    var customTranslation = new Translation(options.language);
                    customTranslation.extend(baseTranslation);
                    options.translations = customTranslation;
                }
                return options;
            };
            Defaults.prototype.reset = function () {
                function stripDiacritics(text) {
                    function match(a) {
                        return DIACRITICS[a] || a;
                    }
                    return text.replace(/[^\u0000-\u007E]/g, match);
                }
                function matcher(params, data) {
                    if ($.trim(params.term) === '') {
                        return data;
                    }
                    if (data.children && data.children.length > 0) {
                        var match = $.extend(true, {}, data);
                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];
                            var matches = matcher(params, child);
                            if (matches == null) {
                                match.children.splice(c, 1);
                            }
                        }
                        if (match.children.length > 0) {
                            return match;
                        }
                        return matcher(params, match);
                    }
                    var original = stripDiacritics(data.text).toUpperCase();
                    var term = stripDiacritics(params.term).toUpperCase();
                    if (original.indexOf(term) > -1) {
                        return data;
                    }
                    return null;
                }
                this.defaults = {
                    amdBase: './',
                    amdLanguageBase: './i18n/',
                    closeOnSelect: true,
                    debug: false,
                    dropdownAutoWidth: false,
                    escapeMarkup: Utils.escapeMarkup,
                    language: EnglishTranslation,
                    matcher: matcher,
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: false,
                    sorter: function (data) {
                        return data;
                    },
                    templateResult: function (result) {
                        return result.text;
                    },
                    templateSelection: function (selection) {
                        return selection.text;
                    },
                    theme: 'default',
                    width: 'resolve'
                };
            };
            Defaults.prototype.set = function (key, value) {
                var camelKey = $.camelCase(key);
                var data = {};
                data[camelKey] = value;
                var convertedData = Utils._convertData(data);
                $.extend(this.defaults, convertedData);
            };
            var defaults = new Defaults();
            return defaults;
        });
        S2.define('select2/options', [
            'require',
            'jquery',
            './defaults',
            './utils'
        ], function (require, $, Defaults, Utils) {
            function Options(options, $element) {
                this.options = options;
                if ($element != null) {
                    this.fromElement($element);
                }
                this.options = Defaults.apply(this.options);
                if ($element && $element.is('input')) {
                    var InputCompat = require(this.get('amdBase') + 'compat/inputData');
                    this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
                }
            }
            Options.prototype.fromElement = function ($e) {
                var excludedData = ['select2'];
                if (this.options.multiple == null) {
                    this.options.multiple = $e.prop('multiple');
                }
                if (this.options.disabled == null) {
                    this.options.disabled = $e.prop('disabled');
                }
                if (this.options.language == null) {
                    if ($e.prop('lang')) {
                        this.options.language = $e.prop('lang').toLowerCase();
                    } else if ($e.closest('[lang]').prop('lang')) {
                        this.options.language = $e.closest('[lang]').prop('lang');
                    }
                }
                if (this.options.dir == null) {
                    if ($e.prop('dir')) {
                        this.options.dir = $e.prop('dir');
                    } else if ($e.closest('[dir]').prop('dir')) {
                        this.options.dir = $e.closest('[dir]').prop('dir');
                    } else {
                        this.options.dir = 'ltr';
                    }
                }
                $e.prop('disabled', this.options.disabled);
                $e.prop('multiple', this.options.multiple);
                if ($e.data('select2Tags')) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
                    }
                    $e.data('data', $e.data('select2Tags'));
                    $e.data('tags', true);
                }
                if ($e.data('ajaxUrl')) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
                    }
                    $e.attr('ajax--url', $e.data('ajaxUrl'));
                    $e.data('ajax--url', $e.data('ajaxUrl'));
                }
                var dataset = {};
                if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
                    dataset = $.extend(true, {}, $e[0].dataset, $e.data());
                } else {
                    dataset = $e.data();
                }
                var data = $.extend(true, {}, dataset);
                data = Utils._convertData(data);
                for (var key in data) {
                    if ($.inArray(key, excludedData) > -1) {
                        continue;
                    }
                    if ($.isPlainObject(this.options[key])) {
                        $.extend(this.options[key], data[key]);
                    } else {
                        this.options[key] = data[key];
                    }
                }
                return this;
            };
            Options.prototype.get = function (key) {
                return this.options[key];
            };
            Options.prototype.set = function (key, val) {
                this.options[key] = val;
            };
            return Options;
        });
        S2.define('select2/core', [
            'jquery',
            './options',
            './utils',
            './keys'
        ], function ($, Options, Utils, KEYS) {
            var Select2 = function ($element, options) {
                if ($element.data('select2') != null) {
                    $element.data('select2').destroy();
                }
                this.$element = $element;
                this.id = this._generateId($element);
                options = options || {};
                this.options = new Options(options, $element);
                Select2.__super__.constructor.call(this);
                var tabindex = $element.attr('tabindex') || 0;
                $element.data('old-tabindex', tabindex);
                $element.attr('tabindex', '-1');
                var DataAdapter = this.options.get('dataAdapter');
                this.dataAdapter = new DataAdapter($element, this.options);
                var $container = this.render();
                this._placeContainer($container);
                var SelectionAdapter = this.options.get('selectionAdapter');
                this.selection = new SelectionAdapter($element, this.options);
                this.$selection = this.selection.render();
                this.selection.position(this.$selection, $container);
                var DropdownAdapter = this.options.get('dropdownAdapter');
                this.dropdown = new DropdownAdapter($element, this.options);
                this.$dropdown = this.dropdown.render();
                this.dropdown.position(this.$dropdown, $container);
                var ResultsAdapter = this.options.get('resultsAdapter');
                this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
                this.$results = this.results.render();
                this.results.position(this.$results, this.$dropdown);
                var self = this;
                this._bindAdapters();
                this._registerDomEvents();
                this._registerDataEvents();
                this._registerSelectionEvents();
                this._registerDropdownEvents();
                this._registerResultsEvents();
                this._registerEvents();
                this.dataAdapter.current(function (initialData) {
                    self.trigger('selection:update', { data: initialData });
                });
                $element.addClass('select2-hidden-accessible');
                $element.attr('aria-hidden', 'true');
                this._syncAttributes();
                $element.data('select2', this);
            };
            Utils.Extend(Select2, Utils.Observable);
            Select2.prototype._generateId = function ($element) {
                var id = '';
                if ($element.attr('id') != null) {
                    id = $element.attr('id');
                } else if ($element.attr('name') != null) {
                    id = $element.attr('name') + '-' + Utils.generateChars(2);
                } else {
                    id = Utils.generateChars(4);
                }
                id = id.replace(/(:|\.|\[|\]|,)/g, '');
                id = 'select2-' + id;
                return id;
            };
            Select2.prototype._placeContainer = function ($container) {
                $container.insertAfter(this.$element);
                var width = this._resolveWidth(this.$element, this.options.get('width'));
                if (width != null) {
                    $container.css('width', width);
                }
            };
            Select2.prototype._resolveWidth = function ($element, method) {
                var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if (method == 'resolve') {
                    var styleWidth = this._resolveWidth($element, 'style');
                    if (styleWidth != null) {
                        return styleWidth;
                    }
                    return this._resolveWidth($element, 'element');
                }
                if (method == 'element') {
                    var elementWidth = $element.outerWidth(false);
                    if (elementWidth <= 0) {
                        return 'auto';
                    }
                    return elementWidth + 'px';
                }
                if (method == 'style') {
                    var style = $element.attr('style');
                    if (typeof style !== 'string') {
                        return null;
                    }
                    var attrs = style.split(';');
                    for (var i = 0, l = attrs.length; i < l; i = i + 1) {
                        var attr = attrs[i].replace(/\s/g, '');
                        var matches = attr.match(WIDTH);
                        if (matches !== null && matches.length >= 1) {
                            return matches[1];
                        }
                    }
                    return null;
                }
                return method;
            };
            Select2.prototype._bindAdapters = function () {
                this.dataAdapter.bind(this, this.$container);
                this.selection.bind(this, this.$container);
                this.dropdown.bind(this, this.$container);
                this.results.bind(this, this.$container);
            };
            Select2.prototype._registerDomEvents = function () {
                var self = this;
                this.$element.on('change.select2', function () {
                    self.dataAdapter.current(function (data) {
                        self.trigger('selection:update', { data: data });
                    });
                });
                this._sync = Utils.bind(this._syncAttributes, this);
                if (this.$element[0].attachEvent) {
                    this.$element[0].attachEvent('onpropertychange', this._sync);
                }
                var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (observer != null) {
                    this._observer = new observer(function (mutations) {
                        $.each(mutations, self._sync);
                    });
                    this._observer.observe(this.$element[0], {
                        attributes: true,
                        subtree: false
                    });
                } else if (this.$element[0].addEventListener) {
                    this.$element[0].addEventListener('DOMAttrModified', self._sync, false);
                }
            };
            Select2.prototype._registerDataEvents = function () {
                var self = this;
                this.dataAdapter.on('*', function (name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerSelectionEvents = function () {
                var self = this;
                var nonRelayEvents = [
                    'toggle',
                    'focus'
                ];
                this.selection.on('toggle', function () {
                    self.toggleDropdown();
                });
                this.selection.on('focus', function (params) {
                    self.focus(params);
                });
                this.selection.on('*', function (name, params) {
                    if ($.inArray(name, nonRelayEvents) !== -1) {
                        return;
                    }
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerDropdownEvents = function () {
                var self = this;
                this.dropdown.on('*', function (name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerResultsEvents = function () {
                var self = this;
                this.results.on('*', function (name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerEvents = function () {
                var self = this;
                this.on('open', function () {
                    self.$container.addClass('select2-container--open');
                });
                this.on('close', function () {
                    self.$container.removeClass('select2-container--open');
                });
                this.on('enable', function () {
                    self.$container.removeClass('select2-container--disabled');
                });
                this.on('disable', function () {
                    self.$container.addClass('select2-container--disabled');
                });
                this.on('blur', function () {
                    self.$container.removeClass('select2-container--focus');
                });
                this.on('query', function (params) {
                    if (!self.isOpen()) {
                        self.trigger('open', {});
                    }
                    this.dataAdapter.query(params, function (data) {
                        self.trigger('results:all', {
                            data: data,
                            query: params
                        });
                    });
                });
                this.on('query:append', function (params) {
                    this.dataAdapter.query(params, function (data) {
                        self.trigger('results:append', {
                            data: data,
                            query: params
                        });
                    });
                });
                this.on('keypress', function (evt) {
                    var key = evt.which;
                    if (self.isOpen()) {
                        if (key === KEYS.ESC || key === KEYS.TAB || key === KEYS.UP && evt.altKey) {
                            self.close();
                            evt.preventDefault();
                        } else if (key === KEYS.ENTER) {
                            self.trigger('results:select', {});
                            evt.preventDefault();
                        } else if (key === KEYS.SPACE && evt.ctrlKey) {
                            self.trigger('results:toggle', {});
                            evt.preventDefault();
                        } else if (key === KEYS.UP) {
                            self.trigger('results:previous', {});
                            evt.preventDefault();
                        } else if (key === KEYS.DOWN) {
                            self.trigger('results:next', {});
                            evt.preventDefault();
                        }
                    } else {
                        if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
                            self.open();
                            evt.preventDefault();
                        }
                    }
                });
            };
            Select2.prototype._syncAttributes = function () {
                this.options.set('disabled', this.$element.prop('disabled'));
                if (this.options.get('disabled')) {
                    if (this.isOpen()) {
                        this.close();
                    }
                    this.trigger('disable', {});
                } else {
                    this.trigger('enable', {});
                }
            };
            Select2.prototype.trigger = function (name, args) {
                var actualTrigger = Select2.__super__.trigger;
                var preTriggerMap = {
                    'open': 'opening',
                    'close': 'closing',
                    'select': 'selecting',
                    'unselect': 'unselecting'
                };
                if (args === undefined) {
                    args = {};
                }
                if (name in preTriggerMap) {
                    var preTriggerName = preTriggerMap[name];
                    var preTriggerArgs = {
                        prevented: false,
                        name: name,
                        args: args
                    };
                    actualTrigger.call(this, preTriggerName, preTriggerArgs);
                    if (preTriggerArgs.prevented) {
                        args.prevented = true;
                        return;
                    }
                }
                actualTrigger.call(this, name, args);
            };
            Select2.prototype.toggleDropdown = function () {
                if (this.options.get('disabled')) {
                    return;
                }
                if (this.isOpen()) {
                    this.close();
                } else {
                    this.open();
                }
            };
            Select2.prototype.open = function () {
                if (this.isOpen()) {
                    return;
                }
                this.trigger('query', {});
            };
            Select2.prototype.close = function () {
                if (!this.isOpen()) {
                    return;
                }
                this.trigger('close', {});
            };
            Select2.prototype.isOpen = function () {
                return this.$container.hasClass('select2-container--open');
            };
            Select2.prototype.hasFocus = function () {
                return this.$container.hasClass('select2-container--focus');
            };
            Select2.prototype.focus = function (data) {
                if (this.hasFocus()) {
                    return;
                }
                this.$container.addClass('select2-container--focus');
                this.trigger('focus', {});
            };
            Select2.prototype.enable = function (args) {
                if (this.options.get('debug') && window.console && console.warn) {
                    console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
                }
                if (args == null || args.length === 0) {
                    args = [true];
                }
                var disabled = !args[0];
                this.$element.prop('disabled', disabled);
            };
            Select2.prototype.data = function () {
                if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
                    console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
                }
                var data = [];
                this.dataAdapter.current(function (currentData) {
                    data = currentData;
                });
                return data;
            };
            Select2.prototype.val = function (args) {
                if (this.options.get('debug') && window.console && console.warn) {
                    console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
                }
                if (args == null || args.length === 0) {
                    return this.$element.val();
                }
                var newVal = args[0];
                if ($.isArray(newVal)) {
                    newVal = $.map(newVal, function (obj) {
                        return obj.toString();
                    });
                }
                this.$element.val(newVal).trigger('change');
            };
            Select2.prototype.destroy = function () {
                this.$container.remove();
                if (this.$element[0].detachEvent) {
                    this.$element[0].detachEvent('onpropertychange', this._sync);
                }
                if (this._observer != null) {
                    this._observer.disconnect();
                    this._observer = null;
                } else if (this.$element[0].removeEventListener) {
                    this.$element[0].removeEventListener('DOMAttrModified', this._sync, false);
                }
                this._sync = null;
                this.$element.off('.select2');
                this.$element.attr('tabindex', this.$element.data('old-tabindex'));
                this.$element.removeClass('select2-hidden-accessible');
                this.$element.attr('aria-hidden', 'false');
                this.$element.removeData('select2');
                this.dataAdapter.destroy();
                this.selection.destroy();
                this.dropdown.destroy();
                this.results.destroy();
                this.dataAdapter = null;
                this.selection = null;
                this.dropdown = null;
                this.results = null;
            };
            Select2.prototype.render = function () {
                var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');
                $container.attr('dir', this.options.get('dir'));
                this.$container = $container;
                this.$container.addClass('select2-container--' + this.options.get('theme'));
                $container.data('element', this.$element);
                return $container;
            };
            return Select2;
        });
        S2.define('select2/compat/utils', ['jquery'], function ($) {
            function syncCssClasses($dest, $src, adapter) {
                var classes, replacements = [], adapted;
                classes = $.trim($dest.attr('class'));
                if (classes) {
                    classes = '' + classes;
                    $(classes.split(/\s+/)).each(function () {
                        if (this.indexOf('select2-') === 0) {
                            replacements.push(this);
                        }
                    });
                }
                classes = $.trim($src.attr('class'));
                if (classes) {
                    classes = '' + classes;
                    $(classes.split(/\s+/)).each(function () {
                        if (this.indexOf('select2-') !== 0) {
                            adapted = adapter(this);
                            if (adapted != null) {
                                replacements.push(adapted);
                            }
                        }
                    });
                }
                $dest.attr('class', replacements.join(' '));
            }
            return { syncCssClasses: syncCssClasses };
        });
        S2.define('select2/compat/containerCss', [
            'jquery',
            './utils'
        ], function ($, CompatUtils) {
            function _containerAdapter(clazz) {
                return null;
            }
            function ContainerCSS() {
            }
            ContainerCSS.prototype.render = function (decorated) {
                var $container = decorated.call(this);
                var containerCssClass = this.options.get('containerCssClass') || '';
                if ($.isFunction(containerCssClass)) {
                    containerCssClass = containerCssClass(this.$element);
                }
                var containerCssAdapter = this.options.get('adaptContainerCssClass');
                containerCssAdapter = containerCssAdapter || _containerAdapter;
                if (containerCssClass.indexOf(':all:') !== -1) {
                    containerCssClass = containerCssClass.replace(':all:', '');
                    var _cssAdapter = containerCssAdapter;
                    containerCssAdapter = function (clazz) {
                        var adapted = _cssAdapter(clazz);
                        if (adapted != null) {
                            return adapted + ' ' + clazz;
                        }
                        return clazz;
                    };
                }
                var containerCss = this.options.get('containerCss') || {};
                if ($.isFunction(containerCss)) {
                    containerCss = containerCss(this.$element);
                }
                CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);
                $container.css(containerCss);
                $container.addClass(containerCssClass);
                return $container;
            };
            return ContainerCSS;
        });
        S2.define('select2/compat/dropdownCss', [
            'jquery',
            './utils'
        ], function ($, CompatUtils) {
            function _dropdownAdapter(clazz) {
                return null;
            }
            function DropdownCSS() {
            }
            DropdownCSS.prototype.render = function (decorated) {
                var $dropdown = decorated.call(this);
                var dropdownCssClass = this.options.get('dropdownCssClass') || '';
                if ($.isFunction(dropdownCssClass)) {
                    dropdownCssClass = dropdownCssClass(this.$element);
                }
                var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
                dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;
                if (dropdownCssClass.indexOf(':all:') !== -1) {
                    dropdownCssClass = dropdownCssClass.replace(':all:', '');
                    var _cssAdapter = dropdownCssAdapter;
                    dropdownCssAdapter = function (clazz) {
                        var adapted = _cssAdapter(clazz);
                        if (adapted != null) {
                            return adapted + ' ' + clazz;
                        }
                        return clazz;
                    };
                }
                var dropdownCss = this.options.get('dropdownCss') || {};
                if ($.isFunction(dropdownCss)) {
                    dropdownCss = dropdownCss(this.$element);
                }
                CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);
                $dropdown.css(dropdownCss);
                $dropdown.addClass(dropdownCssClass);
                return $dropdown;
            };
            return DropdownCSS;
        });
        S2.define('select2/compat/initSelection', ['jquery'], function ($) {
            function InitSelection(decorated, $element, options) {
                if (options.get('debug') && window.console && console.warn) {
                    console.warn('Select2: The `initSelection` option has been deprecated in favor' + ' of a custom data adapter that overrides the `current` method. ' + 'This method is now called multiple times instead of a single ' + 'time when the instance is initialized. Support will be removed ' + 'for the `initSelection` option in future versions of Select2');
                }
                this.initSelection = options.get('initSelection');
                this._isInitialized = false;
                decorated.call(this, $element, options);
            }
            InitSelection.prototype.current = function (decorated, callback) {
                var self = this;
                if (this._isInitialized) {
                    decorated.call(this, callback);
                    return;
                }
                this.initSelection.call(null, this.$element, function (data) {
                    self._isInitialized = true;
                    if (!$.isArray(data)) {
                        data = [data];
                    }
                    callback(data);
                });
            };
            return InitSelection;
        });
        S2.define('select2/compat/inputData', ['jquery'], function ($) {
            function InputData(decorated, $element, options) {
                this._currentData = [];
                this._valueSeparator = options.get('valueSeparator') || ',';
                if ($element.prop('type') === 'hidden') {
                    if (options.get('debug') && console && console.warn) {
                        console.warn('Select2: Using a hidden input with Select2 is no longer ' + 'supported and may stop working in the future. It is recommended ' + 'to use a `<select>` element instead.');
                    }
                }
                decorated.call(this, $element, options);
            }
            InputData.prototype.current = function (_, callback) {
                function getSelected(data, selectedIds) {
                    var selected = [];
                    if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
                        data.selected = true;
                        selected.push(data);
                    } else {
                        data.selected = false;
                    }
                    if (data.children) {
                        selected.push.apply(selected, getSelected(data.children, selectedIds));
                    }
                    return selected;
                }
                var selected = [];
                for (var d = 0; d < this._currentData.length; d++) {
                    var data = this._currentData[d];
                    selected.push.apply(selected, getSelected(data, this.$element.val().split(this._valueSeparator)));
                }
                callback(selected);
            };
            InputData.prototype.select = function (_, data) {
                if (!this.options.get('multiple')) {
                    this.current(function (allData) {
                        $.map(allData, function (data) {
                            data.selected = false;
                        });
                    });
                    this.$element.val(data.id);
                    this.$element.trigger('change');
                } else {
                    var value = this.$element.val();
                    value += this._valueSeparator + data.id;
                    this.$element.val(value);
                    this.$element.trigger('change');
                }
            };
            InputData.prototype.unselect = function (_, data) {
                var self = this;
                data.selected = false;
                this.current(function (allData) {
                    var values = [];
                    for (var d = 0; d < allData.length; d++) {
                        var item = allData[d];
                        if (data.id == item.id) {
                            continue;
                        }
                        values.push(item.id);
                    }
                    self.$element.val(values.join(self._valueSeparator));
                    self.$element.trigger('change');
                });
            };
            InputData.prototype.query = function (_, params, callback) {
                var results = [];
                for (var d = 0; d < this._currentData.length; d++) {
                    var data = this._currentData[d];
                    var matches = this.matches(params, data);
                    if (matches !== null) {
                        results.push(matches);
                    }
                }
                callback({ results: results });
            };
            InputData.prototype.addOptions = function (_, $options) {
                var options = $.map($options, function ($option) {
                    return $.data($option[0], 'data');
                });
                this._currentData.push.apply(this._currentData, options);
            };
            return InputData;
        });
        S2.define('select2/compat/matcher', ['jquery'], function ($) {
            function oldMatcher(matcher) {
                function wrappedMatcher(params, data) {
                    var match = $.extend(true, {}, data);
                    if (params.term == null || $.trim(params.term) === '') {
                        return match;
                    }
                    if (data.children) {
                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];
                            var doesMatch = matcher(params.term, child.text, child);
                            if (!doesMatch) {
                                match.children.splice(c, 1);
                            }
                        }
                        if (match.children.length > 0) {
                            return match;
                        }
                    }
                    if (matcher(params.term, data.text, data)) {
                        return match;
                    }
                    return null;
                }
                return wrappedMatcher;
            }
            return oldMatcher;
        });
        S2.define('select2/compat/query', [], function () {
            function Query(decorated, $element, options) {
                if (options.get('debug') && window.console && console.warn) {
                    console.warn('Select2: The `query` option has been deprecated in favor of a ' + 'custom data adapter that overrides the `query` method. Support ' + 'will be removed for the `query` option in future versions of ' + 'Select2.');
                }
                decorated.call(this, $element, options);
            }
            Query.prototype.query = function (_, params, callback) {
                params.callback = callback;
                var query = this.options.get('query');
                query.call(null, params);
            };
            return Query;
        });
        S2.define('select2/dropdown/attachContainer', [], function () {
            function AttachContainer(decorated, $element, options) {
                decorated.call(this, $element, options);
            }
            AttachContainer.prototype.position = function (decorated, $dropdown, $container) {
                var $dropdownContainer = $container.find('.dropdown-wrapper');
                $dropdownContainer.append($dropdown);
                $dropdown.addClass('select2-dropdown--below');
                $container.addClass('select2-container--below');
            };
            return AttachContainer;
        });
        S2.define('select2/dropdown/stopPropagation', [], function () {
            function StopPropagation() {
            }
            StopPropagation.prototype.bind = function (decorated, container, $container) {
                decorated.call(this, container, $container);
                var stoppedEvents = [
                    'blur',
                    'change',
                    'click',
                    'dblclick',
                    'focus',
                    'focusin',
                    'focusout',
                    'input',
                    'keydown',
                    'keyup',
                    'keypress',
                    'mousedown',
                    'mouseenter',
                    'mouseleave',
                    'mousemove',
                    'mouseover',
                    'mouseup',
                    'search',
                    'touchend',
                    'touchstart'
                ];
                this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
                    evt.stopPropagation();
                });
            };
            return StopPropagation;
        });
        S2.define('select2/selection/stopPropagation', [], function () {
            function StopPropagation() {
            }
            StopPropagation.prototype.bind = function (decorated, container, $container) {
                decorated.call(this, container, $container);
                var stoppedEvents = [
                    'blur',
                    'change',
                    'click',
                    'dblclick',
                    'focus',
                    'focusin',
                    'focusout',
                    'input',
                    'keydown',
                    'keyup',
                    'keypress',
                    'mousedown',
                    'mouseenter',
                    'mouseleave',
                    'mousemove',
                    'mouseover',
                    'mouseup',
                    'search',
                    'touchend',
                    'touchstart'
                ];
                this.$selection.on(stoppedEvents.join(' '), function (evt) {
                    evt.stopPropagation();
                });
            };
            return StopPropagation;
        });
        (function (factory) {
            if (typeof S2.define === 'function' && S2.define.amd) {
                S2.define('jquery-mousewheel', ['jquery'], factory);
            } else if (typeof exports === 'object') {
                module.exports = factory;
            } else {
                factory(jQuery);
            }
        }(function ($) {
            var toFix = [
                    'wheel',
                    'mousewheel',
                    'DOMMouseScroll',
                    'MozMousePixelScroll'
                ], toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : [
                    'mousewheel',
                    'DomMouseScroll',
                    'MozMousePixelScroll'
                ], slice = Array.prototype.slice, nullLowestDeltaTimeout, lowestDelta;
            if ($.event.fixHooks) {
                for (var i = toFix.length; i;) {
                    $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
                }
            }
            var special = $.event.special.mousewheel = {
                version: '3.1.12',
                setup: function () {
                    if (this.addEventListener) {
                        for (var i = toBind.length; i;) {
                            this.addEventListener(toBind[--i], handler, false);
                        }
                    } else {
                        this.onmousewheel = handler;
                    }
                    $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
                    $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
                },
                teardown: function () {
                    if (this.removeEventListener) {
                        for (var i = toBind.length; i;) {
                            this.removeEventListener(toBind[--i], handler, false);
                        }
                    } else {
                        this.onmousewheel = null;
                    }
                    $.removeData(this, 'mousewheel-line-height');
                    $.removeData(this, 'mousewheel-page-height');
                },
                getLineHeight: function (elem) {
                    var $elem = $(elem), $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
                    if (!$parent.length) {
                        $parent = $('body');
                    }
                    return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
                },
                getPageHeight: function (elem) {
                    return $(elem).height();
                },
                settings: {
                    adjustOldDeltas: true,
                    normalizeOffset: true
                }
            };
            $.fn.extend({
                mousewheel: function (fn) {
                    return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
                },
                unmousewheel: function (fn) {
                    return this.unbind('mousewheel', fn);
                }
            });
            function handler(event) {
                var orgEvent = event || window.event, args = slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, offsetX = 0, offsetY = 0;
                event = $.event.fix(orgEvent);
                event.type = 'mousewheel';
                if ('detail' in orgEvent) {
                    deltaY = orgEvent.detail * -1;
                }
                if ('wheelDelta' in orgEvent) {
                    deltaY = orgEvent.wheelDelta;
                }
                if ('wheelDeltaY' in orgEvent) {
                    deltaY = orgEvent.wheelDeltaY;
                }
                if ('wheelDeltaX' in orgEvent) {
                    deltaX = orgEvent.wheelDeltaX * -1;
                }
                if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
                    deltaX = deltaY * -1;
                    deltaY = 0;
                }
                delta = deltaY === 0 ? deltaX : deltaY;
                if ('deltaY' in orgEvent) {
                    deltaY = orgEvent.deltaY * -1;
                    delta = deltaY;
                }
                if ('deltaX' in orgEvent) {
                    deltaX = orgEvent.deltaX;
                    if (deltaY === 0) {
                        delta = deltaX * -1;
                    }
                }
                if (deltaY === 0 && deltaX === 0) {
                    return;
                }
                if (orgEvent.deltaMode === 1) {
                    var lineHeight = $.data(this, 'mousewheel-line-height');
                    delta *= lineHeight;
                    deltaY *= lineHeight;
                    deltaX *= lineHeight;
                } else if (orgEvent.deltaMode === 2) {
                    var pageHeight = $.data(this, 'mousewheel-page-height');
                    delta *= pageHeight;
                    deltaY *= pageHeight;
                    deltaX *= pageHeight;
                }
                absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
                if (!lowestDelta || absDelta < lowestDelta) {
                    lowestDelta = absDelta;
                    if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                        lowestDelta /= 40;
                    }
                }
                if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                    delta /= 40;
                    deltaX /= 40;
                    deltaY /= 40;
                }
                delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
                deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
                deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);
                if (special.settings.normalizeOffset && this.getBoundingClientRect) {
                    var boundingRect = this.getBoundingClientRect();
                    offsetX = event.clientX - boundingRect.left;
                    offsetY = event.clientY - boundingRect.top;
                }
                event.deltaX = deltaX;
                event.deltaY = deltaY;
                event.deltaFactor = lowestDelta;
                event.offsetX = offsetX;
                event.offsetY = offsetY;
                event.deltaMode = 0;
                args.unshift(event, delta, deltaX, deltaY);
                if (nullLowestDeltaTimeout) {
                    clearTimeout(nullLowestDeltaTimeout);
                }
                nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
                return ($.event.dispatch || $.event.handle).apply(this, args);
            }
            function nullLowestDelta() {
                lowestDelta = null;
            }
            function shouldAdjustOldDeltas(orgEvent, absDelta) {
                return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
            }
        }));
        S2.define('jquery.select2', [
            'jquery',
            'jquery-mousewheel',
            './select2/core',
            './select2/defaults'
        ], function ($, _, Select2, Defaults) {
            if ($.fn.select2 == null) {
                var thisMethods = [
                    'open',
                    'close',
                    'destroy'
                ];
                $.fn.select2 = function (options) {
                    options = options || {};
                    if (typeof options === 'object') {
                        this.each(function () {
                            var instanceOptions = $.extend(true, {}, options);
                            var instance = new Select2($(this), instanceOptions);
                        });
                        return this;
                    } else if (typeof options === 'string') {
                        var ret;
                        this.each(function () {
                            var instance = $(this).data('select2');
                            if (instance == null && window.console && console.error) {
                                console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
                            }
                            var args = Array.prototype.slice.call(arguments, 1);
                            ret = instance[options].apply(instance, args);
                        });
                        if ($.inArray(options, thisMethods) > -1) {
                            return this;
                        }
                        return ret;
                    } else {
                        throw new Error('Invalid arguments for Select2: ' + options);
                    }
                };
            }
            if ($.fn.select2.defaults == null) {
                $.fn.select2.defaults = Defaults;
            }
            return Select2;
        });
        return {
            define: S2.define,
            require: S2.require
        };
    }();
    var select2 = S2.require('jquery.select2');
    jQuery.fn.select2.amd = S2;
    return select2;
}));
define('checkbox', ['jquery'], function () {
    !function ($) {
        'use strict';
        var CHECKED_CLASS = 'checked';
        var HALF_CHECKED_CLASS = 'halfchecked';
        var DISABLED_CLASS = 'disabled';
        var Checkbox = function (element, options) {
            this.$element = $(element);
            this.$checkbox = this.$element.find('input');
        };
        var old = $.fn.checkbox;
        $.fn.checkbox = function (option) {
            return this.each(function () {
                var $this = $(this), data = $this.data('checkbox'), options = typeof option == 'object' && option;
                if (!data)
                    $this.data('checkbox', data = new Checkbox(this, options));
                else if (option)
                    data[option]();
            });
        };
        Checkbox.prototype.toggle = function () {
            if (this.$checkbox.prop('checked'))
                this.uncheck();
            else
                this.check();
            this.$checkbox.trigger('change');
        };
        Checkbox.prototype.check = function () {
            if (this.$checkbox.prop('disabled'))
                return;
            this.$checkbox.prop('checked', true);
            this.$checkbox.trigger('change');
        };
        Checkbox.prototype.uncheck = function () {
            if (this.$checkbox.prop('disabled'))
                return;
            this.$checkbox.prop('checked', false);
            this.$checkbox.trigger('change');
        };
        Checkbox.prototype.halfcheck = function () {
            if (this.$checkbox.prop('disabled'))
                return;
            this.$checkbox.prop('checked', false);
            this.$element.removeClass(CHECKED_CLASS).addClass('halfchecked');
        };
        Checkbox.prototype.disable = function () {
            this.$checkbox.prop('disabled', true);
            this.$checkbox.trigger('change');
        };
        Checkbox.prototype.enable = function () {
            this.$checkbox.prop('disabled', false);
            this.$checkbox.trigger('change');
        };
        $.fn.checkbox.defaults = { loadingText: 'loading...' };
        $.fn.checkbox.Constructor = Checkbox;
        $.fn.checkbox.noConflict = function () {
            $.fn.checkbox = old;
            return this;
        };
        $.fn.radio = $.fn.checkbox;
        $(document).on('change', 'input[type=\'checkbox\'], input[type=\'radio\']', function (e) {
            var $checkbox = $(e.currentTarget);
            var $container = $checkbox.parent();
            var update = function ($checkbox) {
                var $container = $checkbox.parent();
                if ($checkbox.prop('checked'))
                    $container.removeClass(HALF_CHECKED_CLASS).addClass(CHECKED_CLASS);
                else
                    $container.removeClass(CHECKED_CLASS).removeClass(HALF_CHECKED_CLASS);
                if ($checkbox.prop('disabled'))
                    $container.addClass(DISABLED_CLASS);
                else
                    $container.removeClass(DISABLED_CLASS);
            };
            if ($container.hasClass('checkbox') || $container.hasClass('radio')) {
                update($checkbox);
            }
            if ($checkbox.attr('type').toLowerCase() === 'radio') {
                var name = $checkbox.attr('name');
                $('input[name=\'' + name + '\']').each(function () {
                    update($(this));
                });
            }
        });
    }(window.jQuery);
    return $.fn.checkbox;
});
define('netjoint-ui', [
    'jquery',
    'affix',
    'alert',
    'button',
    'carousel',
    'collapse',
    'dropdown',
    'modal',
    'popover',
    'scrollspy',
    'tab',
    'tooltip',
    'transition',
    'select2',
    'checkbox'
], function () {
    $(function () {
        $('[data-spy="scroll"]').scrollspy();
        $('[data-spy="affix"]').affix();
        $('[data-toggle="select"]').select2();
    });
});
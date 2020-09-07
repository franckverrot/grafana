+++
# -----------------------------------------------------------------------
# Do not edit this file. It is automatically generated by API Documenter.
# -----------------------------------------------------------------------
title = "CSVReader"
keywords = ["grafana","documentation","sdk","@grafana/data"]
type = "docs"
+++

## CSVReader class

<b>Signature</b>

```typescript
export declare class CSVReader 
```
<b>Import</b>

```typescript
import { CSVReader } from '@grafana/data';
```
<b>Constructors</b>

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [constructor(options)](#constructor-options) |  | Constructs a new instance of the <code>CSVReader</code> class |

<b>Properties</b>

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [callback](#callback-property) |  | <code>CSVParseCallbacks</code> |  |
|  [config](#config-property) |  | <code>CSVConfig</code> |  |
|  [current](#current-property) |  | <code>MutableDataFrame</code> |  |
|  [data](#data-property) |  | <code>MutableDataFrame[]</code> |  |
|  [state](#state-property) |  | <code>ParseState</code> |  |

<b>Methods</b>

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [readCSV(text)](#readcsv-method) |  |  |

### constructor(options)

Constructs a new instance of the `CSVReader` class

<b>Signature</b>

```typescript
constructor(options?: CSVOptions);
```
<b>Parameters</b>

|  Parameter | Type | Description |
|  --- | --- | --- |
|  options | <code>CSVOptions</code> |  |

### callback property

<b>Signature</b>

```typescript
callback?: CSVParseCallbacks;
```

### config property

<b>Signature</b>

```typescript
config: CSVConfig;
```

### current property

<b>Signature</b>

```typescript
current: MutableDataFrame;
```

### data property

<b>Signature</b>

```typescript
data: MutableDataFrame[];
```

### state property

<b>Signature</b>

```typescript
state: ParseState;
```

### readCSV method

<b>Signature</b>

```typescript
readCSV(text: string): MutableDataFrame[];
```
<b>Parameters</b>

|  Parameter | Type | Description |
|  --- | --- | --- |
|  text | <code>string</code> |  |

<b>Returns:</b>

`MutableDataFrame[]`

Goal: Send JSON to logs that:

- give a list of information based on options
- any event
- Pass in all data- elements
-- Include ignore data elements, for example bind

**Requires:** jquery

## Example usage:

```
$('a').captureMeOn('click', options);
```

default options:

```
{
    "engine": null, //either null or a function.  Null defaults to console
    "dataExclude":["bind"], //exclude all things using data-*, based on list.  data-bind is popular amongst knockout
    "alwaysInclude":[], //key/value list of objects to always include.  If it needs to run at runtime, wrap in a function
    "includeHref": true
}
```

Given defaults, the output for html:

```
<a href="Test/Test1.html" data-bind="visible: isVisible" data-userId="12345">Click Here</a>
```

is:

```
{ 
    "href":"Test/Test1.html",
    "userId":"12345",
    "datetime":1456595819081
}
```
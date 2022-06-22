
### Компонент с ошибками
Селетор `.cform__error-block` используется для отображания ошибок в форме.
Лучше всего он сочетается с компонентом Typography 

```typescript jsx
<Typography variant="small" className="cform__error-block">
    {errorText}
</Typography>
```
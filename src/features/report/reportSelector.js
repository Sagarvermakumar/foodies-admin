export const makeReportSelector = (key) => (state) => state.report.reports[key];
export const makeLoadingSelector = (key) => (state) => state.report.loading[key];
export const makeErrorSelector = (key) => (state) => state.report.error[key];

// Usage
// const sales = useSelector(makeReportSelector("sales"));
// const salesLoading = useSelector(makeLoadingSelector("sales"));
// const salesError = useSelector(makeErrorSelector("sales"));

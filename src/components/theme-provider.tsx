export function ThemeProvider({ children, ...props }: any) {
  // return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  return <div {...props}>{children}</div>
}

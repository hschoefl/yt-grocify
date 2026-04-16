# Tuturial for Expo, Clerk and correct Auth Handling

## Form Management

- we are using "react hook form" for form handling ([text](https://react-hook-form.com/))
- we are using zod for validation
- expo router is alway looking to the closest index.tsx file
- the closest layoutfile is first executed by expo router, even before index.tsx
- status bar is handled by expo-router
- Guarding: protecting group of screens
- using Clerk for authentication (according to teacher best way of auth)
- expo-dev-client: da muss man nicht immer die App rebuilden, wenn man ein neues Package installiert
- wir verwenden native tabs in diesem Projekt
- wir verwenden expo API routes für die Kommunikation mit der API; damit muss man kein separates Backend bauen; zum Testen kann man z.B. dann folgendes Kommando verwenden: curl http://localhost:8081/api/items

Video: 1:43
Link: https://www.youtube.com/watch?v=TuwcMlYAJlA

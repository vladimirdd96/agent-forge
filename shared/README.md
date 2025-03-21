# Shared - AgentForge

Shared types, utilities, and constants used across the AgentForge platform.

## 📁 Contents

### Types
- Agent interfaces
- Token types
- API request/response types
- Blockchain interaction types

### Constants
- Network configurations
- API endpoints
- Token parameters
- Agent configuration

## 🛠️ Usage

1. Import types in TypeScript files:
```typescript
import { Agent, TokenConfig } from '../shared/types';
```

2. Use shared constants:
```typescript
import { NETWORK_CONFIG, API_ENDPOINTS } from '../shared/constants';
```

## 📦 Structure

```
shared/
├── types.ts           # TypeScript interfaces and types
├── constants.ts       # Shared constants and configurations
└── utils/            # Common utility functions
```

## 🧪 Development

- Keep types synchronized between frontend and backend
- Maintain consistent naming conventions
- Document all shared interfaces and types
- Version control shared constants

## 🔄 Updates

When updating shared types or constants:
1. Update documentation
2. Notify team members
3. Update dependent components
4. Run type checks across the project 
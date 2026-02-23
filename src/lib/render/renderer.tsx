"use client";

import type { ReactNode } from "react";
import { ActionProvider, Renderer, StateProvider, VisibilityProvider } from "@json-render/react";
import type { ComponentRenderer, Spec } from "@json-render/react";

import { Fallback, registry } from "./registry";

// =============================================================================
// ExplorerRenderer
// =============================================================================

interface ExplorerRendererProps {
  spec: Spec | null;
  loading?: boolean;
}

const fallback: ComponentRenderer = ({ element }) => <Fallback type={element.type} />;

export function ExplorerRenderer({ spec, loading }: ExplorerRendererProps): ReactNode {
  if (!spec) return null;

  return (
    <StateProvider initialState={spec.state ?? {}}>
      <VisibilityProvider>
        <ActionProvider>
          <Renderer spec={spec} registry={registry} fallback={fallback} loading={loading} />
        </ActionProvider>
      </VisibilityProvider>
    </StateProvider>
  );
}

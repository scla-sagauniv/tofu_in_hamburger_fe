import { useMemo } from 'react';
import { createConnectTransport } from '@bufbuild/connect-web';
import { ServiceType } from '@bufbuild/protobuf';
import { PromiseClient, createPromiseClient } from '@bufbuild/connect';

const transport = createConnectTransport({
  baseUrl: 'https://41ba-126-156-205-43.ngrok-free.app',
});

export function useClient<T extends ServiceType>(service: T): PromiseClient<T> {
  return useMemo(() => createPromiseClient(service, transport), [service]);
}

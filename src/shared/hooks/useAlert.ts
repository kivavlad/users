import { useCallback, useMemo } from 'react';

import { notification } from 'antd';

type NotificationOptions = Parameters<typeof notification.open>[0];
type AlertType = 'success' | 'error' | 'warn' | 'info';

interface UseAlertReturn {
  success: (message: string, options?: NotificationOptions) => void;
  error: (message: string, options?: NotificationOptions) => void;
  warn: (message: string, options?: NotificationOptions) => void;
  warning: (message: string, options?: NotificationOptions) => void;
  info: (message: string, options?: NotificationOptions) => void;
}

const defaultOptions: Partial<NotificationOptions> = {
  placement: 'bottomRight',
  duration: 3,
};

const useAlert = (): UseAlertReturn => {
  const showAlert = useCallback(
    (type: AlertType, message: string, options?: NotificationOptions): void => {
      const config: NotificationOptions = {
        ...defaultOptions,
        ...options,
        message,
      };

      switch (type) {
        case 'success':
          notification.success(config);
          break;
        case 'error':
          notification.error(config);
          break;
        case 'warn':
          notification.warning(config);
          break;
        case 'info':
          notification.info(config);
          break;
        default:
          notification.open(config);
      }
    },
    []
  );

  const alertApi = useMemo((): UseAlertReturn => {
    return {
      success: (message, options) => showAlert('success', message, options),
      error: (message, options) => showAlert('error', message, options),
      warn: (message, options) => showAlert('warn', message, options),
      warning: (message, options) => showAlert('warn', message, options),
      info: (message, options) => showAlert('info', message, options),
    };
  }, [showAlert]);

  return alertApi;
};

export default useAlert;

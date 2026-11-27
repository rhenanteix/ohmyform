import React, { forwardRef, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';

export interface Column<T> {
  key: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyAccessor: keyof T | ((row: T) => string);
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  onRowClick?: (row: T) => void;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  pagination?: {
    pageSize: number;
    current: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
    pageSizeOptions?: number[];
  };
  sort?: {
    column: string;
    direction: 'asc' | 'desc';
    onChange: (column: string, direction: 'asc' | 'desc') => void;
  };
  selection?: {
    selectedKeys: string[];
    onChange: (keys: string[]) => void;
    getKey: (row: T) => string;
  };
  expandable?: {
    expandedRowRender: (record: T) => React.ReactNode;
    rowExpandable?: (record: T) => boolean;
    defaultExpandAllRows?: boolean;
  };
}

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: var(--omf-borderRadius-lg);
  border: 1px solid var(--omf-colors-border);
  background: var(--omf-colors-background-primary);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--omf-typography-fontSize-sm);
  color: var(--omf-colors-text-primary);
`;

const Thead = styled.thead`
  background: var(--omf-colors-background-secondary);
`;

const Th = styled.th<{ $align?: TableProps<any>['columns'][0]['align']; $width?: string; $minWidth?: string; $sortable?: boolean; $compact?: boolean }>`
  padding: ${({ $compact }) => ($compact ? 'var(--omf-spacing-2) var(--omf-spacing-3)' : 'var(--omf-spacing-3) var(--omf-spacing-4)')};
  text-align: ${({ $align }) => $align || 'left'};
  font-weight: var(--omf-typography-fontWeight-semibold);
  font-size: var(--omf-typography-fontSize-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--omf-colors-text-muted);
  white-space: nowrap;
  border-bottom: 1px solid var(--omf-colors-border);
  width: ${({ $width }) => $width};
  min-width: ${({ $minWidth }) => $minWidth};
  user-select: none;

  ${({ $sortable }) =>
    $sortable &&
    css`
      cursor: pointer;
      &:hover {
        color: var(--omf-colors-text-primary);
      }
    `}
`;

const Tbody = styled.tbody``;

const Tr = styled.tr<{ $hoverable?: boolean; $selected?: boolean; $clickable?: boolean }>`
  border-bottom: 1px solid var(--omf-colors-border-muted);
  transition: background var(--omf-transitions-fast);

  &:last-child {
    border-bottom: none;
  }

  ${({ $hoverable, $selected, $clickable }) =>
    ($hoverable || $clickable) &&
    css`
      &:hover {
        background: ${$selected ? 'var(--omf-colors-primary-50)' : 'var(--omf-colors-background-tertiary)'};
      }
    `}

  ${({ $selected }) =>
    $selected &&
    css`
      background: var(--omf-colors-primary-50);
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}
`;

const Td = styled.td<{ $align?: TableProps<any>['columns'][0]['align']; $compact?: boolean }>`
  padding: ${({ $compact }) => ($compact ? 'var(--omf-spacing-2) var(--omf-spacing-3)' : 'var(--omf-spacing-3) var(--omf-spacing-4)')};
  text-align: ${({ $align }) => $align || 'left'};
  vertical-align: middle;
  color: var(--omf-colors-text-primary);
`;

const SortIcon = ({ direction }: { direction: 'asc' | 'desc' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {direction === 'asc' ? (
      <polyline points="18 15 12 9 6 15" />
    ) : (
      <polyline points="6 9 12 15 18 9" />
    )}
  </svg>
);

const CheckboxHeader = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }>(
  ({ style, indeterminate, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = React.useCallback((node: HTMLInputElement | null) => {
      if (node && typeof ref === 'function') {
        ref(node);
      } else if (node && ref && typeof ref === 'object') {
        ref.current = node;
      }
      inputRef.current = node;
    }, [ref]);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return <input ref={combinedRef} style={style} {...props} />;
  },
);
CheckboxHeader.displayName = 'CheckboxHeader';

const CheckboxCell = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--omf-colors-primary-600);
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--omf-spacing-3) var(--omf-spacing-4);
  border-top: 1px solid var(--omf-colors-border-muted);
  background: var(--omf-colors-background-secondary);
  border-radius: 0 0 var(--omf-borderRadius-lg) var(--omf-borderRadius-lg);
  flex-wrap: wrap;
  gap: var(--omf-spacing-3);
`;

const PaginationInfo = styled.span`
  font-size: var(--omf-typography-fontSize-sm);
  color: var(--omf-colors-text-secondary);
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-2);
`;

const PageSizeSelect = styled.select`
  padding: var(--omf-spacing-1) var(--omf-spacing-2);
  font-size: var(--omf-typography-fontSize-sm);
  border: 1px solid var(--omf-colors-border);
  border-radius: var(--omf-borderRadius-md);
  background: var(--omf-colors-background-primary);
  color: var(--omf-colors-text-primary);
  cursor: pointer;
`;

const PageButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 var(--omf-spacing-2);
  font-size: var(--omf-typography-fontSize-sm);
  font-weight: var(--omf-typography-fontWeight-medium);
  color: ${({ $disabled }) => ($disabled ? 'var(--omf-colors-text-muted)' : 'var(--omf-colors-text-secondary)')};
  background: ${({ $disabled }) => ($disabled ? 'transparent' : 'var(--omf-colors-background-primary)')};
  border: 1px solid ${({ $disabled }) => ($disabled ? 'var(--omf-colors-border-muted)' : 'var(--omf-colors-border)')};
  border-radius: var(--omf-borderRadius-md);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all var(--omf-transitions-fast);

  &:hover:not(:disabled) {
    background: var(--omf-colors-primary-50);
    border-color: var(--omf-colors-primary-300);
    color: var(--omf-colors-primary-700);
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

const PageNumberButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 var(--omf-spacing-2);
  font-size: var(--omf-typography-fontSize-sm);
  font-weight: ${({ $active }) => ($active ? 'var(--omf-typography-fontWeight-semibold)' : 'var(--omf-typography-fontWeight-medium)')};
  color: ${({ $active }) => ($active ? 'var(--omf-colors-semantic-success-foreground)' : 'var(--omf-colors-text-secondary)')};
  background: ${({ $active }) => ($active ? 'var(--omf-colors-primary-600)' : 'var(--omf-colors-background-primary)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--omf-colors-primary-600)' : 'var(--omf-colors-border)')};
  border-radius: var(--omf-borderRadius-md);
  cursor: pointer;
  transition: all var(--omf-transitions-fast);

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? 'var(--omf-colors-primary-700)' : 'var(--omf-colors-primary-50)')};
    border-color: ${({ $active }) => ($active ? 'var(--omf-colors-primary-700)' : 'var(--omf-colors-primary-300)')};
    color: ${({ $active }) => ($active ? 'var(--omf-colors-semantic-success-foreground)' : 'var(--omf-colors-primary-700)')};
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

function TableComponent<T>({
  columns,
  data,
  keyAccessor,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  emptyAction,
  onRowClick,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  pagination,
  sort,
  selection,
  expandable,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(sort?.column || null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(sort?.direction || 'asc');
  const [expandedRows, setExpandedRows] = useState<string[]>(
    expandable?.defaultExpandAllRows && data.length > 0
      ? data.map((row) => getRowKey(row))
      : []
  );

  const handleSort = (columnKey: string) => {
    const column = columns.find((c) => c.key === columnKey);
    if (!column?.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (sortColumn === columnKey && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortColumn(columnKey);
    setSortDirection(direction);
    sort?.onChange(columnKey, direction);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selection) return;
    if (e.target.checked) {
      selection.onChange(data.map((row) => selection.getKey(row)));
    } else {
      selection.onChange([]);
    }
  };

  const handleSelectRow = (row: T, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selection) return;
    const key = selection.getKey(row);
    const newKeys = e.target.checked
      ? [...selection.selectedKeys, key]
      : selection.selectedKeys.filter((k) => k !== key);
    selection.onChange(newKeys);
  };

  const toggleRowExpand = (rowKey: string) => {
    if (!expandable) return;
    setExpandedRows((prev) =>
      prev.includes(rowKey) ? prev.filter((k) => k !== rowKey) : [...prev, rowKey]
    );
  };

  const getRowKey = (row: T) => (typeof keyAccessor === 'function' ? keyAccessor(row) : String(row[keyAccessor]));

  const renderCell = (column: Column<T>, row: T, rowIndex: number) => {
    const value = typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor as keyof T];
    if (column.render) {
      return column.render(value, row, rowIndex);
    }
    if (React.isValidElement(value) || Array.isArray(value)) return value;
    if (value instanceof Date) return value.toLocaleDateString();
    return typeof value === 'object' && value !== null ? '—' : value;
  };

  if (loading) {
    return (
      <Wrapper>
        <StyledTable>
          <Thead>
            <tr>
              {expandable && <Th $width="48px" />}
              {selection && <Th $width="48px" />}
              {columns.map((col) => (
                <Th key={col.key} $align={col.align} $width={col.width} $minWidth={col.minWidth} $sortable={col.sortable}>
                  {col.header}
                </Th>
              ))}
            </tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={`skeleton-${i}`}>
                {expandable && <Td><div style={{ width: '24px', height: '24px', background: 'var(--omf-colors-border-muted)', borderRadius: '4px' }} /></Td>}
                {selection && <Td><div style={{ width: '16px', height: '16px', background: 'var(--omf-colors-border-muted)', borderRadius: '4px' }} /></Td>}
                {columns.map((col) => (
                  <Td key={col.key} $align={col.align}>
                    <div style={{ height: '16px', background: 'linear-gradient(90deg, var(--omf-colors-background-tertiary) 25%, var(--omf-colors-border-muted) 50%, var(--omf-colors-background-tertiary) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '4px', width: '60%' }} />
                  </Td>
                ))}
              </tr>
            ))}
          </Tbody>
        </StyledTable>
      </Wrapper>
    );
  }

  if (data.length === 0) {
    return (
      <Wrapper>
        <StyledTable>
          <Thead>
            <tr>
              {expandable && <Th $width="48px" />}
              {selection && <Th $width="48px" />}
              {columns.map((col) => (
                <Th key={col.key} $align={col.align} $width={col.width} $minWidth={col.minWidth} $sortable={col.sortable}>
                  {col.header}
                </Th>
              ))}
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td colSpan={columns.length + (selection ? 1 : 0) + (expandable ? 1 : 0)} style={{ textAlign: 'center', padding: 'var(--omf-spacing-12) var(--omf-spacing-4)', color: 'var(--omf-colors-text-muted)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--omf-spacing-4)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--omf-colors-text-muted)', opacity: 0.5 }} aria-hidden="true">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    <path d="M21 3.5l-6 6m-6-6l6 6" />
                  </svg>
                  <span style={{ fontSize: 'var(--omf-typography-fontSize-base)', fontWeight: 'var(--omf-typography-fontWeight-medium)' }}>{emptyMessage}</span>
                  {emptyAction}
                </div>
              </Td>
            </tr>
          </Tbody>
        </StyledTable>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <StyledTable>
        <Thead>
          <tr>
            {expandable && <Th $width="48px" style={{ textAlign: 'center' }} />}
            {selection && (
              <Th $width="48px" style={{ textAlign: 'center' }}>
                <CheckboxHeader
                  type="checkbox"
                  checked={selection.selectedKeys.length === data.length && data.length > 0}
                  indeterminate={selection.selectedKeys.length > 0 && selection.selectedKeys.length < data.length}
                  onChange={handleSelectAll}
                  aria-label="Selecionar todas as linhas"
                />
              </Th>
            )}
            {columns.map((col) => (
              <Th
                key={col.key}
                $align={col.align}
                $width={col.width}
                $minWidth={col.minWidth}
                $sortable={col.sortable}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--omf-spacing-1)' }}>
                  {col.header}
                  {col.sortable && sortColumn === col.key && <SortIcon direction={sortDirection} />}
                </div>
              </Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => {
            const rowKey = getRowKey(row);
            const isSelected = selection?.selectedKeys.includes(rowKey);
            const isExpanded = expandable && expandedRows.includes(rowKey);
            const canExpand = expandable && (!expandable.rowExpandable || expandable.rowExpandable(row));

            return (
              <React.Fragment key={rowKey}>
                <Tr
                  key={rowKey}
                  $hoverable={hoverable}
                  $selected={isSelected}
                  $clickable={!!onRowClick || canExpand}
                  onClick={(e) => {
                    if (canExpand && !selection) {
                      e.stopPropagation();
                      toggleRowExpand(rowKey);
                    }
                    onRowClick?.(row);
                  }}
                >
                  {expandable && (
                    <Td style={{ textAlign: 'center', padding: 'var(--omf-spacing-2)' }}>
                      {canExpand && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpand(rowKey);
                          }}
                          aria-expanded={isExpanded}
                          aria-controls={`expanded-${rowKey}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--omf-colors-text-muted)',
                            cursor: 'pointer',
                            borderRadius: 'var(--omf-borderRadius-md)',
                            transition: 'all var(--omf-transitions-fast)',
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform var(--omf-transitions-fast)' }}
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      )}
                    </Td>
                  )}
                  {selection && (
                    <Td style={{ textAlign: 'center' }}>
                      <CheckboxCell
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(row, e)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Selecionar linha ${rowIndex + 1}`}
                      />
                    </Td>
                  )}
                  {columns.map((col) => (
                    <Td key={col.key} $align={col.align} $compact={compact}>
                      {renderCell(col, row, rowIndex)}
                    </Td>
                  ))}
                </Tr>
                {isExpanded && expandable && (
                  <tr key={`expanded-${rowKey}`}>
                    <Td colSpan={columns.length + (selection ? 1 : 0) + (expandable ? 1 : 0)} style={{ padding: 0 }}>
                      <div id={`expanded-${rowKey}`} style={{ padding: 'var(--omf-spacing-4)', background: 'var(--omf-colors-background-secondary)', borderTop: '1px solid var(--omf-colors-border-muted)' }}>
                        {expandable.expandedRowRender(row)}
                      </div>
                    </Td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </Tbody>
      </StyledTable>
      {pagination && (
        <PaginationWrapper>
          <PaginationInfo>
            Mostrando {(pagination.current - 1) * pagination.pageSize + 1} a {Math.min(pagination.current * pagination.pageSize, pagination.total)} de {pagination.total} resultados
          </PaginationInfo>
          <PaginationControls>
            <PageSizeSelect
              value={pagination.pageSize}
              onChange={(e) => pagination.onChange(1, Number(e.target.value))}
            >
              {pagination.pageSizeOptions?.map((size) => (
                <option key={size} value={size}>
                  {size} por página
                </option>
              ))}
            </PageSizeSelect>
            <PageButton
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              disabled={pagination.current <= 1}
              aria-label="Página anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </PageButton>
            {Array.from({ length: Math.ceil(pagination.total / pagination.pageSize) }, (_, i) => i + 1)
              .filter((page) => page === 1 || page === Math.ceil(pagination.total / pagination.pageSize) || (page >= pagination.current - 1 && page <= pagination.current + 1))
              .map((page, index, arr) => (
                <React.Fragment key={page}>
                  {index > 0 && arr[index - 1] !== page - 1 && (
                    <span style={{ padding: '0 var(--omf-spacing-1)', color: 'var(--omf-colors-text-muted)' }}>...</span>
                  )}
                  <PageNumberButton
                    $active={page === pagination.current}
                    onClick={() => pagination.onChange(page, pagination.pageSize)}
                    aria-label={`Página ${page}`}
                    aria-current={page === pagination.current ? 'page' : undefined}
                  >
                    {page}
                  </PageNumberButton>
                </React.Fragment>
              ))}
            <PageButton
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              aria-label="Próxima página"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </PageButton>
          </PaginationControls>
        </PaginationWrapper>
      )}
    </Wrapper>
  );
}

export const Table = Object.assign(TableComponent, {
  displayName: 'Table',
});
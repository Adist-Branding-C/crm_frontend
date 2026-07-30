import { Loader2, MessageSquare, Search, Send, X } from 'lucide-react';
import { useWhatsappTemplatePicker } from '../hooks/useWhatsappTemplatePicker';
import AdminPagination from './crud/AdminPagination';
import './WhatsappTemplatePickerOverlay.css';
import type { WhatsappTemplateItem } from '../../features/account-settings/whatsapp-template/types/whatsapp-template.types';

export interface WhatsappTemplatePickerOverlayProps {
  onClose: () => void;
  onSelectTemplate: (template: WhatsappTemplateItem) => void;
  onSendWithoutTemplate: () => void;
}

// Full-screen picker for the WhatsApp quick action on a lead/deal. Only
// mounted while open (parent renders it conditionally), so every open starts
// a fresh paginated fetch via useWhatsappTemplatePicker rather than loading
// every active template up front.
const WhatsappTemplatePickerOverlay = ({
  onClose,
  onSelectTemplate,
  onSendWithoutTemplate,
}: WhatsappTemplatePickerOverlayProps) => {
  const {
    list: templates,
    isLoading,
    error,
    pageNumber,
    setPageNumber,
    limit,
    totalCount,
    startIndex,
    totalPages,
    searchQuery,
    handleSearchChange,
    handleRowsPerPageChange,
  } = useWhatsappTemplatePicker();

  const handleSelect = (template: WhatsappTemplateItem) => {
    onSelectTemplate(template);
    onClose();
  };

  const handleSendPlain = () => {
    onSendWithoutTemplate();
    onClose();
  };

  return (
    <div className="wa-picker-overlay" onClick={onClose}>
      <div className="wa-picker-panel" onClick={(e) => e.stopPropagation()}>
        <div className="wa-picker-header">
          <h5>Send WhatsApp Message</h5>
          <button className="wa-picker-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="wa-picker-body">
          <button type="button" className="wa-picker-plain" onClick={handleSendPlain}>
            <MessageSquare size={16} /> Send without a template
          </button>

          <div className="wa-picker-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search templates by name or message..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <div className="wa-picker-list">
            {isLoading ? (
              <div className="wa-picker-loading">
                <Loader2 size={16} className="spin" /> Loading templates...
              </div>
            ) : error ? (
              <div className="wa-picker-empty">{error}</div>
            ) : templates.length === 0 ? (
              <div className="wa-picker-empty">
                {searchQuery ? 'No templates match your search.' : 'No active templates found.'}
              </div>
            ) : (
              templates.map((template) => {
                const message = template.message || template.content || '';
                return (
                  <div key={template.id} className="wa-picker-card">
                    <div className="wa-picker-card-header">
                      <div className="wa-picker-card-title">
                        <span className="wa-picker-card-icon">
                          <MessageSquare size={13} />
                        </span>
                        <span className="wa-picker-card-name">
                          {template.templateName || template.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="wa-picker-card-send"
                        onClick={() => handleSelect(template)}
                      >
                        <Send size={13} /> Send
                      </button>
                    </div>
                    {message && (
                      <p className="wa-picker-card-bubble">{message}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {!isLoading && !error && totalCount > 0 && (
          <AdminPagination
            currentPage={pageNumber}
            totalPages={totalPages}
            startIndex={startIndex}
            rowsPerPage={limit}
            totalItems={totalCount}
            onPageChange={setPageNumber}
            onRowsPerPageChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            showRowsSelector
          />
        )}
      </div>
    </div>
  );
};

export default WhatsappTemplatePickerOverlay;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Filter, ArrowDownUp, Loader } from 'lucide-react';
import KanbanColumn from '@/components/deals/KanbanColumn';
import { Deal } from '@/components/deals/DealCard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DealForm from '@/components/deals/DealForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const stageLabels: Record<string, string> = {
  "lead": "Lead",
  "discovery": "Discovery",
  "proposal": "Proposal",
  "negotiation": "Negotiation",
  "closed-won": "Closed Won",
  "closed-lost": "Closed Lost"
};

const stageOrder = ["lead", "discovery", "proposal", "negotiation", "closed-won", "closed-lost"];

const Deals = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Group deals by stage
  const dealsByStage = React.useMemo(() => {
    const grouped = stageOrder.reduce((acc, stage) => {
      acc[stage] = deals.filter(deal => deal.stage === stage);
      return acc;
    }, {} as Record<string, Deal[]>);
    
    return grouped;
  }, [deals]);

  // Calculate total value for each stage
  const calculateTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + Number(deal.value), 0);
  };

  // Fetch deals from Supabase
  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDeals(data as Deal[]);
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast({
        title: "Error",
        description: "Failed to load deals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a new deal
  const handleAddDeal = async (formData: any) => {
    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('deals')
        .insert([
          {
            title: formData.title,
            company: formData.company,
            value: formData.value,
            probability: formData.probability,
            stage: formData.stage,
            close_date: formData.close_date,
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Deal has been added successfully.",
      });
      
      setIsAddDialogOpen(false);
      fetchDeals(); // Refresh the deals list
    } catch (error) {
      console.error('Error adding deal:', error);
      toast({
        title: "Error",
        description: "Failed to add deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle updating a deal
  const handleUpdateDeal = async (formData: any) => {
    if (!selectedDeal) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('deals')
        .update({
          title: formData.title,
          company: formData.company,
          value: formData.value,
          probability: formData.probability,
          stage: formData.stage,
          close_date: formData.close_date,
        })
        .eq('id', selectedDeal.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Deal has been updated successfully.",
      });
      
      setIsEditSheetOpen(false);
      setSelectedDeal(null);
      fetchDeals(); // Refresh the deals list
    } catch (error) {
      console.error('Error updating deal:', error);
      toast({
        title: "Error",
        description: "Failed to update deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting a deal
  const handleDeleteDeal = async () => {
    if (!selectedDeal) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', selectedDeal.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Deal has been deleted successfully.",
      });
      
      setIsEditSheetOpen(false);
      setSelectedDeal(null);
      fetchDeals(); // Refresh the deals list
    } catch (error) {
      console.error('Error deleting deal:', error);
      toast({
        title: "Error",
        description: "Failed to delete deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle drag and drop
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Return if dropped outside a droppable area or in the same position
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the deal that was dragged
    const draggedDeal = deals.find(deal => deal.id.toString() === draggableId);
    if (!draggedDeal) return;

    try {
      // Update the deal's stage in Supabase
      const { error } = await supabase
        .from('deals')
        .update({ stage: destination.droppableId })
        .eq('id', draggedDeal.id);

      if (error) {
        throw error;
      }

      // Update local state
      const newDeals = [...deals];
      const draggedDealIndex = newDeals.findIndex(deal => deal.id.toString() === draggableId);
      
      newDeals[draggedDealIndex] = {
        ...newDeals[draggedDealIndex],
        stage: destination.droppableId as any
      };
      
      setDeals(newDeals);

      toast({
        title: "Success",
        description: `Deal moved to ${stageLabels[destination.droppableId]}`,
      });
    } catch (error) {
      console.error('Error updating deal stage:', error);
      toast({
        title: "Error",
        description: "Failed to update deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle clicking on a deal card
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsEditSheetOpen(true);
  };

  // Fetch deals on component mount
  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deals Pipeline</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowDownUp className="h-4 w-4 mr-2" /> Sort
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> New Deal
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-auto pb-6">
            {stageOrder.map((stage) => (
              <KanbanColumn 
                key={stage}
                id={stage}
                title={stageLabels[stage]}
                deals={dealsByStage[stage] || []}
                count={(dealsByStage[stage] || []).length}
                value={calculateTotalValue(dealsByStage[stage] || [])}
                onDealClick={handleDealClick}
              />
            ))}
          </div>
        </DragDropContext>
      )}

      {/* Add Deal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
            <DialogDescription>
              Enter deal details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <DealForm 
            onSubmit={handleAddDeal} 
            isSubmitting={isSubmitting} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Deal Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={(open) => {
        setIsEditSheetOpen(open);
        if (!open) setSelectedDeal(null);
      }}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Deal</SheetTitle>
          </SheetHeader>
          {selectedDeal && (
            <div className="py-6">
              <DealForm 
                initialData={selectedDeal} 
                onSubmit={handleUpdateDeal} 
                isSubmitting={isSubmitting} 
              />
              <div className="mt-6 pt-6 border-t">
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleDeleteDeal}
                  disabled={isSubmitting}
                >
                  Delete Deal
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Deals;

"use client";
import React, { use, useEffect } from 'react'
import { ArrowUpRight, ArrowDownRight, CreditCard, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
  import { toast } from "sonner";
import useFetch from '@/hooks/use-fetch';
import { updateDefaultAccount } from '@/actions/account';
import { deleteAccount } from '@/actions/dashboard';


const AccountCard = ({account}) => {
    const {name,type,balance,id,isDefault}=account;
    const {
        loading:updateDefaultLoading,
        fn:handleDefaultFn,
        data:updatedAccount,
        error,
    }=useFetch(updateDefaultAccount);
  
    const {
        loading:deleteAccountLoading,
        fn:deleteAccountFn,
        data:DeleteAccount,
        error:deleteError,
    }=useFetch(deleteAccount);

    const handleDeleteAccount=async(e)=>{
        e.preventDefault();
        if(isDefault){
            toast.error("Make another account default before deleting this account");
            return;
        }
        await deleteAccountFn(id);
    }

    const handleDefaultChange=async(e)=>{
        e.preventDefault();
        if(isDefault){
            toast.error("You need to have at least one default account");
            return;
        }
        await handleDefaultFn(id);    
    };
    useEffect(()=>{
      if(DeleteAccount?.success){
          toast.success("Account deleted successfully");
      }
  },[DeleteAccount,deleteAccountLoading]);

  useEffect(()=>{
      if(deleteError){
          toast.error(error.message||"Failed to update default account");
      }
  },[deleteError]);


    useEffect(()=>{
        if(updatedAccount?.success){
            toast.success("Default account updated successfully");
        }
    },[updatedAccount,updateDefaultLoading]);

    useEffect(()=>{
        if(error){
            toast.error(error.message||"Failed to update default account");
        }
    },[error]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
    <Link href={`/account/${id}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {name}
        </CardTitle>
        <Switch
          checked={isDefault}
          onClick={handleDefaultChange}
          disabled={updateDefaultLoading}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex justify-between items-center">
        ₹{parseFloat(balance).toFixed(2)}
        <Trash2 className='hover:bg-rose-500' onClick={handleDeleteAccount}
        disabled={deleteAccountLoading}
        />
        </div>
        <p className="text-xs text-muted-foreground">
          {type.charAt(0) + type.slice(1).toLowerCase()} Account
        </p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          Income
        </div>
        <div className="flex items-center">
          <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          Expense
        </div>
      </CardFooter>
    </Link>
  </Card> 
  )
}

export default AccountCard

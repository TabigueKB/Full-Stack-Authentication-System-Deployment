import { Component, OnInit } from '@angular/core';
import { first, filter, switchMap } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html', standalone: false })
export class ListComponent implements OnInit {
    accounts: any[] = [];
    loading = true;
    error = '';

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        // Wait until account (with JWT token) is available before fetching
        this.accountService.account.pipe(
            filter(account => !!account?.jwtToken),
            first(),
            switchMap(() => this.accountService.getAll())
        ).subscribe({
            next: accounts => {
                this.accounts = accounts;
                this.loading = false;
            },
            error: err => {
                this.error = err?.message || 'Failed to load accounts';
                this.loading = false;
            }
        });
    }

    deleteAccount(id: number) {
        const account = this.accounts.find(x => x.id === id);
        if (!account) return;

        if (confirm('Are you sure you want to delete this account?')) {
            account.isDeleting = true;
            this.accountService.delete(id)
                .pipe(first())
                .subscribe(() => {
                    this.accounts = this.accounts.filter(x => x.id !== id);
                });
        }
    }
}
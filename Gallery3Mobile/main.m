//
//  main.m
//  test
//
//  Created by David Steinberger on 8/31/10.
//  Copyright - 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

int main(int argc, char *argv[]) {
    
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    int retVal = UIApplicationMain(argc, argv, nil, @"testAppDelegate");
    [pool release];
    return retVal;
}
